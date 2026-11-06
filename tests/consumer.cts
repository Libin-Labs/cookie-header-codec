import * as api from '@lp-labs/cookie-header-codec';
import { parseCookieHeader, formatCookieHeader } from '@lp-labs/cookie-header-codec';
const pairs = parseCookieHeader('session=abc; theme=dark');
console.log(formatCookieHeader(pairs));
// @ts-expect-error invalid argument must be rejected by declarations
api.parseCookieHeader(4);
