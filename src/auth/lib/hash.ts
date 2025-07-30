import bcrypt from "bcrypt";
import { Hasher } from "./types";

export class HashingService implements Hasher {
  constructor(
    private readonly hasher: typeof bcrypt,
    private readonly saltRounds: number
  ) {
    console.log("HashingService initialized");
  }

  async hash(password: string) {
    return await this.hasher.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string) {
    return await this.hasher.compare(password, hash);
  }
}

export const bcryptService = new HashingService(bcrypt, 10);
