import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/sessionOptions";

export type User = {
  isLoggedIn: boolean;
  id: number;
  email: string;
};

export default withIronSessionApiRoute(function userRoute(req, res) {
  console.log("SESSION: ", req.session);
  if (req.session.user) {
    return res.json({ ...req.session.user, isLoggedIn: true });
  }
  return res.json({ isLoggedIn: false, id: "", email: "" });
}, sessionOptions);
