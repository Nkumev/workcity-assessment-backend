import { NextFunction, Request, Response } from "express";
import { JwtService, authTokenService } from "../auth/lib/jwt";
import { ResponseMessage } from "../lib/utils";
import { UserRole } from "../../@client/prisma";

export class AuthMiddleware {
  constructor(
    private readonly tokenService: JwtService,
    private readonly messages: ResponseMessage
  ) {}

  protected = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: this.messages.unauthorized(),
        error: "Invalid or expired token",
      });
    }

    const payload = this.tokenService.verify(token);

    if (!payload) {
      return res.status(401).json({
        message: this.messages.unauthorized(),
        error: "Invalid or expired token",
      });
    }

    req.user = payload;
    next();
  };

  admin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: this.messages.unauthorized(),
        error: "Invalid or expired token",
      });
    }

    if (req.user.role !== UserRole.ADMIN) {
      return res.status(403).json({
        message: this.messages.forbidden(),
        error: "Forbidden",
      });
    }

    next();
  };
}

export const authMiddleware = new AuthMiddleware(
  authTokenService,
  new ResponseMessage("Auth")
);
