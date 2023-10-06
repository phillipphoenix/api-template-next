import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import invariant from "tiny-invariant";
import { hashPassword } from "../lib/auth/passwordUtils";

const prisma = new PrismaClient();

function setupDevEnvVariables() {
  // Load environment variables from .env file, if in development mode.
  if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "../.env" });
  }
}

async function seed() {
  invariant(process.env.DB_SEED_USER_EMAIL, "DB_SEED_USER_EMAIL is required");
  invariant(
    process.env.DB_SEED_USER_PASSWORD,
    "DB_SEED_USER_PASSWORD is required",
  );

  console.log("Seeding initial user to DB. 🙍");

  const userEmail = process.env.DB_SEED_USER_EMAIL;
  const user = await prisma.user.findFirst({ where: { email: userEmail } });

  if (!user) {
    // Hash the password.
    const passwordData = hashPassword(process.env.DB_SEED_USER_PASSWORD);

    await prisma.user.create({
      data: {
        email: userEmail,
        passwordHash: passwordData.hash,
        passwordSalt: passwordData.salt,
      },
    });
  }

  // Nothing to seed as of yet.

  console.log(`Database has been seeded. 🌱`);
}

setupDevEnvVariables();
seed()
  .catch((e) => console.error(e))
  .finally(() => process.exit(0));
