import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/sessionOptions";
import { Prisma } from "@prisma/client";

export type DbInfo = {
  builtInTables: DbTableInfo[];
  customTables: DbTableInfo[];
};

export type DbTableInfo = {
  name: string;
  properties: string[];
};

const builtInTableNames = ["User", "ApiKey"];

export default withIronSessionApiRoute(function userRoute(req, res) {
  // Make sure the user is logged in.
  const { session } = req;
  if (!session?.user) {
    return res.status(401).end();
  }

  const models = Prisma.dmmf.datamodel.models;
  const builtInModels = models.filter((m) =>
    builtInTableNames.includes(m.name),
  );
  const customModels = models.filter(
    (m) => !builtInTableNames.includes(m.name),
  );

  const builtInTables: DbTableInfo[] = builtInModels.map((m) => ({
    name: m.name,
    properties: m.fields.map((f) => f.name),
  }));
  const customTables: DbTableInfo[] = customModels.map((m) => ({
    name: m.name,
    properties: m.fields.map((f) => f.name),
  }));

  return res.status(200).json({ builtInTables, customTables } as DbInfo);
}, sessionOptions);
