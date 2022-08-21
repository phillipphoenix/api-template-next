import crypto from "crypto";
import { prisma } from "../../prisma/db.server";

type ApiKeyHash = {
  hash: string;
  salt: string;
};

export const hashApiKey = (apiKey: string): ApiKeyHash => {
  // Create a unique salt.
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the API key with the salt.
  const hash = crypto
    .pbkdf2Sync(apiKey, salt, 1000, 64, "sha512")
    .toString("hex");

  // Return the hashed API key and salt.
  return { hash, salt };
};

export const validateApiKey = async (apiKeyWithPrefix: string) => {
  if (!apiKeyWithPrefix.includes(".")) {
    console.log("API key is missing a prefix.");
    return false;
  }

  // Separate the API key from the prefix.
  const [prefix, apiKey] = apiKeyWithPrefix.split(".");

  const storedValues = await prisma.apiKey.findFirst({
    where: { prefix },
    select: { keyHash: true, keySalt: true },
  });

  if (!storedValues) {
    console.log("No API key found with the given prefix.");
    return false;
  }

  const { keyHash, keySalt } = storedValues;

  // Hash the API key with the same salt.
  const apiKeyHash = crypto
    .pbkdf2Sync(apiKey, keySalt, 1000, 64, "sha512")
    .toString("hex");

  // Return true if the hashes are equal, false otherwise.
  return keyHash === apiKeyHash;
};
