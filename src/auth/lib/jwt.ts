import * as jwt from "jsonwebtoken";
import ms from "ms";
import { AUTH_EXPIRES, AUTH_SECRET } from "../../lib/env";
import { AuthTokenPayload, AuthTokenReturn } from "./types";

export class JwtService {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string | number
  ) {
    console.log("JwtService initialized");
  }

  sign(payload: AuthTokenPayload) {
    const expiresIn = this.moment(this.expiresIn);
    return jwt.sign(payload, this.secret, {
      expiresIn,
    });
  }

  verify(token: string): AuthTokenReturn | null {
    try {
      return jwt.verify(token, this.secret) as AuthTokenReturn;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private moment(value: string | number) {
    if (typeof value === "string") {
      return value as ms.StringValue;
    }
    return value;
  }
}

export const authTokenService = new JwtService(AUTH_SECRET, AUTH_EXPIRES);
