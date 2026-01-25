import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayload;
      user?: {
        sub: string;
        [key: string]: any;
      };
    }
  }
}

export {};
