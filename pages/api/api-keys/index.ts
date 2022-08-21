import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { hashApiKey } from "../../../lib/api-keys/apiKeyUtils.server";
import { sessionOptions } from "../../../lib/sessionOptions";
import { prisma } from "../../../prisma/db.server";

export default withIronSessionApiRoute(async function apiKeys(req, res) {
  // Make sure the user is logged in.
  const { session } = req;
  if (!session?.user) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    return getApiKeys(req, res);
  }
  if (req.method === "POST") {
    return postApiKeys(req, res);
  }

  return res.status(405).end();
}, sessionOptions);

const getApiKeys = async (_req: NextApiRequest, res: NextApiResponse) => {
  const apiKeys = await prisma.apiKey.findMany();
  return res.json(apiKeys);
};

const postApiKeys = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, prefix, apiKey } = req.body;

  if (!name || !prefix || !apiKey) {
    res.statusCode = 400;
    res.statusMessage = "Missing name, prefix or API key.";
    return res.json({ errorMessage: res.statusMessage });
  }

  const { hash, salt } = hashApiKey(apiKey);

  await prisma.apiKey.create({
    data: {
      name,
      prefix,
      keyHash: hash,
      keySalt: salt,
    },
  });

  return res.status(200).json({ message: "API key created successfully!" });
};
