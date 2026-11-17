interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Embeds structured data. `<` is escaped so the JSON can't close the script tag early. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
