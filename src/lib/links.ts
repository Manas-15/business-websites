/** Builds outbound links without any API keys or backend. */

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function mapsSearchLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
