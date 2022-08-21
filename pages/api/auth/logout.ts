import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/sessionOptions";
import { User } from "./user";

export default withIronSessionApiRoute(function logoutRoute(req, res) {
  req.session.destroy();
  return res.json({ isLoggedIn: false, id: -1, email: "" } as User);
}, sessionOptions);
