import crypto from "crypto";

type PasswordHash = {
  hash: string;
  salt: string;
};

export const hashPassword = (password: string) => {
  // Create a unique salt.
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the password with the salt.
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  // Return the hashed password and salt.
  return { hash, salt };
};

export const validatePassword = (
  password: string,
  hash: string,
  salt: string
) => {
  // Hash the password with the same salt.
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  // Return true if the hashes are equal, false otherwise.
  return hash === passwordHash;
};
