import invariant from "tiny-invariant";

invariant(process.env.AUTH_COOKIE_NAME, "AUTH_COOKIE_NAME is not set");
invariant(process.env.AUTH_COOKIE_SECRET, "AUTH_COOKIE_SECRET is not set");

export const envSettings = {
  // Auth.
  authCookieName: process.env.AUTH_COOKIE_NAME,
  authCookieSecret: process.env.AUTH_COOKIE_SECRET,
};
