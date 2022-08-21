import { NextApiHandler } from "next";
import { NewApiError } from "../../types/api/ApiError";
import { validateApiKey } from "./apiKeyUtils.server";

export const withApiKeyApiRoute = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    // Make sure there is an API key in the request and that it is valid.
    const [_, apiKeyAndPrefix] = req.headers.authorization?.split(" ") || [];

    if (!apiKeyAndPrefix) {
      console.log("No API key in request for " + req.url);
      res.statusCode = 401;
      res.statusMessage = "Unauthenticated.";
      return res.json(NewApiError(401, "Unauthenticated."));
    }

    const keyValid = await validateApiKey(apiKeyAndPrefix);

    if (!keyValid) {
      console.log("Invalid API key in request for " + req.url);
      res.statusCode = 401;
      res.statusMessage = "Unauthenticated.";
      return res.json(NewApiError(401, "Unauthenticated."));
    }

    return handler(req, res);
  };
};
