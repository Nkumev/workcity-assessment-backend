import { UserRole } from "../../../@client/prisma";

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthTokenReturn extends AuthTokenPayload {
  iat: number;
  exp: number;
}

export interface Hasher {
  hash: (password: string) => Promise<string>;
  compare: (password: string, hash: string) => Promise<boolean>;
}
