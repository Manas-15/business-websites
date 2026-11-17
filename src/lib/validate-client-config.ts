import { getContrastRatio, isHexColor } from "@/lib/color";
import {
  BUSINESS_TYPES,
  FONT_NAMES,
  RADIUS_OPTIONS,
  SECTION_KEYS,
  IMPLEMENTED_VARIANTS,
  type BusinessType,
  type ClientConfig,
} from "@/types/client-config";
import { FEATURE_ICON_NAMES, type RestaurantContent } from "@/types/content";

export class ClientConfigError extends Error {
  constructor(readonly issues: string[]) {
    super(`Invalid client config:\n - ${issues.join("\n - ")}`);
    this.name = "ClientConfigError";
  }
}

type Obj = Record<string, unknown>;

interface Rule {
  test: (value: string) => boolean;
  message: string;
}

const MIN_TEXT_CONTRAST = 4.5;

function isObject(value: unknown): value is Obj {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBusinessType(value: unknown): value is BusinessType {
  return BUSINESS_TYPES.some((type) => type === value);
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function oneOf(values: readonly string[]): Rule {
  return {
    test: (value) => values.includes(value),
    message: `must be one of: ${values.join(", ")}`,
  };
}

const rules = {
  hex: { test: isHexColor, message: "must be a hex color such as #8B1E24" },
  url: { test: isHttpUrl, message: "must be an absolute http(s) URL" },
  href: {
    test: (value: string) =>
      value.startsWith("/") || value.startsWith("#") || isHttpUrl(value),
    message: "must be a path, a #section anchor or an http(s) URL",
  },
  assetPath: {
    test: (value: string) => (value.startsWith("/") && !value.includes("..")) || isHttpUrl(value),
    message: "must be a root-relative path such as /clients/name/logo.svg or an https URL",
  },
  slug: {
    test: (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
    message: "must be lowercase letters, digits and single hyphens, e.g. bella-italia",
  },
  email: {
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "must be a valid email address",
  },
  phone: {
    test: (value: string) =>
      /^\+?[\d\s()-]+$/.test(value) && value.replace(/\D/g, "").length >= 7,
    message: "must be a phone number with at least 7 digits",
  },
  whatsapp: {
    test: (value: string) => /^\d{8,15}$/.test(value),
    message: "must be digits only, including the country code (e.g. 919876543210)",
  },
} satisfies Record<string, Rule>;

/** Collects every problem instead of stopping at the first, so one build shows all errors. */
class FieldReader {
  readonly issues: string[] = [];

  object(value: unknown, path: string): Obj {
    if (isObject(value)) return value;
    this.issues.push(`${path} must be an object`);
    return {};
  }

  array(value: unknown, path: string): unknown[] {
    if (Array.isArray(value)) return value;
    this.issues.push(`${path} must be an array`);
    return [];
  }

  /** Required text. Missing or blank values are reported and return "". */
  text(obj: Obj, key: string, path: string, rule?: Rule): string {
    const raw = obj[key];
    if (raw === undefined || (typeof raw === "string" && raw.trim() === "")) {
      this.issues.push(`${path}.${key} is required`);
      return "";
    }
    return this.optionalText(obj, key, path, rule) ?? "";
  }

  /** Optional text. Blank values are treated as absent. */
  optionalText(obj: Obj, key: string, path: string, rule?: Rule): string | undefined {
    const raw = obj[key];
    if (raw === undefined || raw === null) return undefined;
    if (typeof raw !== "string") {
      this.issues.push(`${path}.${key} must be a string`);
      return undefined;
    }
    const value = raw.trim();
    if (value === "") return undefined;
    if (rule && !rule.test(value)) {
      this.issues.push(`${path}.${key} ${rule.message}`);
      return undefined;
    }
    return value;
  }

  choice<T extends string>(obj: Obj, key: string, path: string, options: readonly T[]): T | undefined {
    const value = this.optionalText(obj, key, path, oneOf(options));
    return value as T | undefined;
  }

  optionalBoolean(obj: Obj, key: string, path: string): boolean | undefined {
    const raw = obj[key];
    if (raw === undefined || raw === null) return undefined;
    if (typeof raw !== "boolean") {
      this.issues.push(`${path}.${key} must be true or false`);
      return undefined;
    }
    return raw;
  }

  /** Required list of non-empty strings. */
  textList(value: unknown, path: string): string[] {
    return this.array(value, path).map((entry, index) => {
      if (typeof entry !== "string" || entry.trim() === "") {
        this.issues.push(`${path}[${index}] must be a non-empty string`);
        return "";
      }
      return entry.trim();
    });
  }
}

function validateImage(reader: FieldReader, value: unknown, path: string) {
  const entry = reader.object(value, path);
  return {
    src: reader.text(entry, "src", path, rules.assetPath),
    alt: reader.text(entry, "alt", path),
  };
}

/** Restaurant page content: menu, story, features, photos and reviews. */
function validateRestaurantContent(reader: FieldReader, input: unknown, path: string): RestaurantContent {
  const root = reader.object(input, path);

  const aboutObj = reader.object(root.about, `${path}.about`);
  const about = {
    eyebrow: reader.text(aboutObj, "eyebrow", `${path}.about`),
    title: reader.text(aboutObj, "title", `${path}.about`),
    paragraphs: reader.textList(aboutObj.paragraphs, `${path}.about.paragraphs`),
    image: aboutObj.image === undefined ? undefined : validateImage(reader, aboutObj.image, `${path}.about.image`),
  };
  if (about.paragraphs.length === 0) reader.issues.push(`${path}.about.paragraphs needs at least one paragraph`);

  const features = reader.array(root.features, `${path}.features`).map((item, index) => {
    const fPath = `${path}.features[${index}]`;
    const entry = reader.object(item, fPath);
    const icon = reader.text(entry, "icon", fPath, oneOf(FEATURE_ICON_NAMES));
    return {
      title: reader.text(entry, "title", fPath),
      description: reader.text(entry, "description", fPath),
      icon: (icon || "sparkles") as RestaurantContent["features"][number]["icon"],
    };
  });

  const categoryIds = new Set<string>();
  const menu = reader.array(root.menu, `${path}.menu`).map((category, index) => {
    const cPath = `${path}.menu[${index}]`;
    const entry = reader.object(category, cPath);
    const id = reader.text(entry, "id", cPath, rules.slug);
    if (id && categoryIds.has(id)) reader.issues.push(`${cPath}.id "${id}" is used by another category`);
    categoryIds.add(id);
    const items = reader.array(entry.items, `${cPath}.items`).map((item, itemIndex) => {
      const iPath = `${cPath}.items[${itemIndex}]`;
      const dish = reader.object(item, iPath);
      const image = reader.optionalText(dish, "image", iPath, rules.assetPath);
      const featured = reader.optionalBoolean(dish, "featured", iPath);
      if (featured && !image) reader.issues.push(`${iPath} is featured but has no image`);
      return {
        name: reader.text(dish, "name", iPath),
        description: reader.text(dish, "description", iPath),
        price: reader.optionalText(dish, "price", iPath),
        vegetarian: reader.optionalBoolean(dish, "vegetarian", iPath),
        featured,
        image,
        tag: reader.optionalText(dish, "tag", iPath),
      };
    });
    if (items.length === 0) reader.issues.push(`${cPath}.items needs at least one dish`);
    return {
      id,
      name: reader.text(entry, "name", cPath),
      description: reader.optionalText(entry, "description", cPath),
      items,
    };
  });
  if (menu.length === 0) reader.issues.push(`${path}.menu needs at least one category`);

  const gallery = reader
    .array(root.gallery, `${path}.gallery`)
    .map((item, index) => validateImage(reader, item, `${path}.gallery[${index}]`));

  const testimonials = reader.array(root.testimonials, `${path}.testimonials`).map((item, index) => {
    const tPath = `${path}.testimonials[${index}]`;
    const entry = reader.object(item, tPath);
    const rating = entry.rating;
    if (![1, 2, 3, 4, 5].includes(rating as number)) {
      reader.issues.push(`${tPath}.rating must be a whole number from 1 to 5`);
    }
    return {
      quote: reader.text(entry, "quote", tPath),
      author: reader.text(entry, "author", tPath),
      context: reader.text(entry, "context", tPath),
      rating: (typeof rating === "number" ? rating : 5) as 1 | 2 | 3 | 4 | 5,
    };
  });

  const highlights = root.highlights === undefined
    ? undefined
    : reader.array(root.highlights, `${path}.highlights`).map((item, index) => {
        const hPath = `${path}.highlights[${index}]`;
        const entry = reader.object(item, hPath);
        return { value: reader.text(entry, "value", hPath), label: reader.text(entry, "label", hPath) };
      });

  let chef: RestaurantContent["chef"];
  if (root.chef !== undefined) {
    const entry = reader.object(root.chef, `${path}.chef`);
    chef = {
      name: reader.text(entry, "name", `${path}.chef`),
      title: reader.text(entry, "title", `${path}.chef`),
      quote: reader.text(entry, "quote", `${path}.chef`),
      bio: reader.optionalText(entry, "bio", `${path}.chef`),
      image: reader.optionalText(entry, "image", `${path}.chef`, rules.assetPath),
    };
  }

  return {
    about,
    features,
    menu,
    gallery,
    testimonials,
    highlights,
    chef,
    heroEyebrow: reader.optionalText(root, "heroEyebrow", path),
    menuNote: reader.optionalText(root, "menuNote", path),
  };
}

function validateNavigation(reader: FieldReader, items: unknown[], path: string) {
  return items.map((item, index) => {
    const entry = reader.object(item, `${path}[${index}]`);
    return {
      label: reader.text(entry, "label", `${path}[${index}]`),
      href: reader.text(entry, "href", `${path}[${index}]`, rules.href),
    };
  });
}

/**
 * Validates untrusted or hand-written config data and returns it typed as
 * ClientConfig. Throws a ClientConfigError listing every problem found.
 */
export function validateClientConfig(input: unknown): ClientConfig {
  const reader = new FieldReader();
  const root = reader.object(input, "clientConfig");

  const businessType = root.businessType;
  if (!isBusinessType(businessType)) {
    reader.issues.push(`clientConfig.businessType must be one of: ${BUSINESS_TYPES.join(", ")}`);
  }
  const variants: readonly string[] = isBusinessType(businessType)
    ? IMPLEMENTED_VARIANTS[businessType]
    : [];
  // Without a valid businessType there is no variant list to check against; the businessType error is enough.
  const templateVariant =
    variants.length > 0 ? reader.text(root, "templateVariant", "clientConfig", oneOf(variants)) : "";

  const slug = reader.text(root, "slug", "clientConfig", rules.slug);

  const business = reader.object(root.business, "clientConfig.business");
  const businessInfo = {
    name: reader.text(business, "name", "clientConfig.business"),
    tagline: reader.text(business, "tagline", "clientConfig.business"),
    description: reader.text(business, "description", "clientConfig.business"),
    logo: reader.optionalText(business, "logo", "clientConfig.business", rules.assetPath),
    favicon: reader.optionalText(business, "favicon", "clientConfig.business", rules.assetPath),
    heroImage: reader.text(business, "heroImage", "clientConfig.business", rules.assetPath),
  };

  // Only restaurants carry their content in config; other types still read src/data.
  const content = businessType === "restaurant"
    ? validateRestaurantContent(reader, root.content, "clientConfig.content")
    : undefined;

  const theme = reader.object(root.theme, "clientConfig.theme");
  const themeColors = {
    primary: reader.text(theme, "primary", "clientConfig.theme", rules.hex),
    secondary: reader.text(theme, "secondary", "clientConfig.theme", rules.hex),
    background: reader.text(theme, "background", "clientConfig.theme", rules.hex),
    text: reader.text(theme, "text", "clientConfig.theme", rules.hex),
  };
  if (isHexColor(themeColors.text) && isHexColor(themeColors.background)) {
    const ratio = getContrastRatio(themeColors.text, themeColors.background);
    if (ratio < MIN_TEXT_CONTRAST) {
      reader.issues.push(
        `clientConfig.theme.text needs at least ${MIN_TEXT_CONTRAST}:1 contrast against the background (currently ${ratio.toFixed(2)}:1)`,
      );
    }
  }
  const fontOptions = FONT_NAMES as readonly string[];
  const headingFont = reader.text(theme, "headingFont", "clientConfig.theme", oneOf(fontOptions));
  const bodyFont = reader.text(theme, "bodyFont", "clientConfig.theme", oneOf(fontOptions));
  const radius = reader.choice(theme, "radius", "clientConfig.theme", RADIUS_OPTIONS);

  const contact = reader.object(root.contact, "clientConfig.contact");
  const contactInfo = {
    phone: reader.text(contact, "phone", "clientConfig.contact", rules.phone),
    email: reader.text(contact, "email", "clientConfig.contact", rules.email),
    address: reader.text(contact, "address", "clientConfig.contact"),
    whatsapp: reader.optionalText(contact, "whatsapp", "clientConfig.contact", rules.whatsapp),
    mapEmbedUrl: reader.optionalText(contact, "mapEmbedUrl", "clientConfig.contact", rules.url),
  };

  const seo = reader.object(root.seo, "clientConfig.seo");
  const keywords = seo.keywords === undefined
    ? undefined
    : reader.array(seo.keywords, "clientConfig.seo.keywords").map((keyword, index) => {
        if (typeof keyword !== "string" || keyword.trim() === "") {
          reader.issues.push(`clientConfig.seo.keywords[${index}] must be a non-empty string`);
          return "";
        }
        return keyword.trim();
      });
  const seoInfo = {
    title: reader.text(seo, "title", "clientConfig.seo"),
    description: reader.text(seo, "description", "clientConfig.seo"),
    keywords,
    ogImage: reader.optionalText(seo, "ogImage", "clientConfig.seo", rules.assetPath),
  };

  let social: ClientConfig["social"];
  if (root.social !== undefined) {
    const links = reader.object(root.social, "clientConfig.social");
    social = {
      instagram: reader.optionalText(links, "instagram", "clientConfig.social", rules.url),
      facebook: reader.optionalText(links, "facebook", "clientConfig.social", rules.url),
      youtube: reader.optionalText(links, "youtube", "clientConfig.social", rules.url),
      x: reader.optionalText(links, "x", "clientConfig.social", rules.url),
    };
  }

  const openingHours = root.openingHours === undefined
    ? undefined
    : reader.array(root.openingHours, "clientConfig.openingHours").map((item, index) => {
        const entry = reader.object(item, `clientConfig.openingHours[${index}]`);
        return {
          day: reader.text(entry, "day", `clientConfig.openingHours[${index}]`),
          hours: reader.text(entry, "hours", `clientConfig.openingHours[${index}]`),
        };
      });

  let announcement: ClientConfig["announcement"];
  if (root.announcement !== undefined) {
    const bar = reader.object(root.announcement, "clientConfig.announcement");
    announcement = {
      text: reader.text(bar, "text", "clientConfig.announcement"),
      href: reader.optionalText(bar, "href", "clientConfig.announcement", rules.href),
    };
  }

  const navigation = root.navigation === undefined
    ? undefined
    : validateNavigation(reader, reader.array(root.navigation, "clientConfig.navigation"), "clientConfig.navigation");

  let sections: ClientConfig["sections"];
  if (root.sections !== undefined) {
    const toggles = reader.object(root.sections, "clientConfig.sections");
    const allowed: readonly string[] = isBusinessType(businessType) ? SECTION_KEYS[businessType] : [];
    const parsed: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(toggles)) {
      if (!allowed.includes(key)) {
        reader.issues.push(`clientConfig.sections.${key} is not a section of ${businessType} templates`);
      } else if (typeof value !== "boolean") {
        reader.issues.push(`clientConfig.sections.${key} must be true or false`);
      } else {
        parsed[key] = value;
      }
    }
    sections = parsed as ClientConfig["sections"];
  }

  if (reader.issues.length > 0) {
    throw new ClientConfigError(reader.issues);
  }

  return {
    slug,
    businessType: businessType as BusinessType,
    templateVariant,
    content,
    business: businessInfo,
    theme: {
      ...themeColors,
      headingFont: headingFont as ClientConfig["theme"]["headingFont"],
      bodyFont: bodyFont as ClientConfig["theme"]["bodyFont"],
      radius,
    },
    contact: contactInfo,
    seo: seoInfo,
    social,
    openingHours,
    announcement,
    navigation,
    sections,
  } as ClientConfig;
}
