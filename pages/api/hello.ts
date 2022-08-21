// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withApiKeyApiRoute } from "../../lib/api-keys/withApiKeyApiRoute";

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns hello world
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: hello world
 */
export default withApiKeyApiRoute((req, res) => {
  res.status(200).json({ message: "Hello world!" });
});
