export interface CookiePair {
  readonly name: string;
  readonly value: string;
}
export function parseCookieHeader(header: string): CookiePair[] {
  if (typeof header !== 'string') throw new TypeError('Cookie header must be text');
  if (header.length > 16384) throw new RangeError('Cookie header too long');
  if (!header.trim()) return [];
  return header.split(';').map((part) => {
    const i = part.indexOf('=');
    if (i <= 0) throw new RangeError('Malformed cookie pair');
    const name = part.slice(0, i).trim(),
      value = part.slice(i + 1).trim();
    if (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(name) || /[\x00-\x1f\x7f;]/.test(value))
      throw new RangeError('Invalid cookie token');
    return { name, value };
  });
}
export function formatCookieHeader(pairs: readonly CookiePair[]): string {
  if (!Array.isArray(pairs)) throw new TypeError('Expected cookie pairs');
  return pairs
    .map(({ name, value }) => {
      if (
        !/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(name) ||
        typeof value !== 'string' ||
        /[;\x00-\x1f\x7f]/.test(value)
      )
        throw new RangeError('Invalid cookie pair');
      return name + '=' + value;
    })
    .join('; ');
}
