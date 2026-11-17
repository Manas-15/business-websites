/** A section renders unless it is explicitly set to `false` in config. */
export function isSectionEnabled<K extends string>(
  sections: Partial<Record<K, boolean>> | undefined,
  key: K,
): boolean {
  return sections?.[key] !== false;
}
