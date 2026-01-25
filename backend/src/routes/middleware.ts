import dotenv from "dotenv";
dotenv.config();
import { expressjwt, GetVerificationKey } from "express-jwt";
import JwksRsa from "jwks-rsa";

console.log(`${process.env.DOMAIN_ID}/.well-known/jwks.json`);

export const checkJwt = expressjwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.DOMAIN_ID}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: `${process.env.API_AUDIENCE}`,
  issuer: `${process.env.DOMAIN_ID}/`,
  algorithms: ["RS256"],
});
