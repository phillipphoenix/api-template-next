import { IronSessionOptions } from "iron-session";
import { User } from "../pages/api/auth/user";
import { envSettings } from "./envSettings.server";

export const sessionOptions: IronSessionOptions = {
  cookieName: envSettings.authCookieName,
  password: envSettings.authCookieSecret,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
