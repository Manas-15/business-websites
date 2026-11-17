/**
 * The template showcase at /preview shows every business type and variant. It is
 * meant for the master repository only, so it stays off unless TEMPLATE_PREVIEW is
 * "true" at build time (set it in .env.local for local use, or in the Netlify
 * environment for a showcase deployment). Client repositories leave it unset.
 */
export function isTemplatePreviewEnabled(): boolean {
  return process.env.TEMPLATE_PREVIEW === "true";
}
