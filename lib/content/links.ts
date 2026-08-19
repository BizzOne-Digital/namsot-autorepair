/**
 * Admins type phone numbers in a human-readable form like "(519) 242-0900", so
 * the `tel:` target has to be derived rather than stored alongside it.
 */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");

  if (!digits) {
    return "";
  }

  // A bare 10-digit North American number needs the country code to dial.
  if (!digits.startsWith("+") && digits.length === 10) {
    return `tel:+1${digits}`;
  }

  return `tel:${digits.startsWith("+") ? digits : `+${digits}`}`;
}

export function mailtoHref(email: string): string {
  return email ? `mailto:${email}` : "";
}

export function mapsHref(address: string): string {
  const query = address.trim();
  if (!query) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
