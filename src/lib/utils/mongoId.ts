import { Response } from "express";
import { ObjectId } from "mongodb";

export class IsMongoValidator {
  static validateId(payload: { [key: string]: string | undefined | null }) {
    let valid = true;
    const arr = Object.values(payload).filter(Boolean);

    for (const value of arr) {
      if (!ObjectId.isValid(value as string)) {
        valid = false;
        break;
      }
    }
    return valid;
  }
}
