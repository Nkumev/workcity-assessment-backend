import { Request } from "express";
import { AuthTokenReturn } from "../auth/lib/types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenReturn;
    }
  }
}
