import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/sessionOptions";
import { prisma } from "../../../prisma/db.server";

export default withIronSessionApiRoute(async function apiKeys(req, res) {
  // Make sure the user is logged in.
  const { session } = req;
  if (!session?.user) {
    return res.status(401).end();
  }

  if (req.method === "DELETE") {
    return deleteApiKey(req, res);
  }

  return res.status(405).end();
}, sessionOptions);

const deleteApiKey = async (req: NextApiRequest, res: NextApiResponse) => {
  const idStr = req.query.id as string;

  if (!idStr) {
    res.statusCode = 400;
    res.statusMessage = "Missing id.";
    return res.json({ errorMessage: res.statusMessage });
  }

  console.log("Deleting API key with id:", idStr);

  const id = parseInt(idStr, 10);

  await prisma.apiKey.delete({ where: { id } });

  res.status(200).json({ message: "API key deleted successfully!" });
};
