import { withIronSessionApiRoute } from "iron-session/next";
import { validatePassword } from "../../../lib/auth/passwordUtils";
import { sessionOptions } from "../../../lib/sessionOptions";
import { prisma } from "../../../prisma/db.server";
import { User } from "./user";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  // Verify user credentials.
  const { email, password } = req.body;

  const userData = await prisma.user.findFirst({
    where: { email },
    select: { id: true, email: true, passwordHash: true, passwordSalt: true },
  });

  // If the user doesn't exist, return authentication failure.
  if (!userData) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Check if the password is valid.
  const isValid = await validatePassword(
    password,
    userData.passwordHash,
    userData.passwordSalt
  );

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Set session data.
  const user = {
    isLoggedIn: true,
    id: userData.id,
    email: userData.email,
  } as User;

  req.session.user = user;
  await req.session.save();
  res.send(user);
}, sessionOptions);
