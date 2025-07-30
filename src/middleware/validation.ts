// middlewares/validate.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ResponseMessage } from "../lib/utils";
import { ObjectId } from "mongodb";

const messageService = new ResponseMessage("Validator");

export enum ValidationType {
  BODY = "body",
  QUERY = "query",
  PARAMS = "params",
}

export function validateDto(
  dtoClass: any,
  type: ValidationType = ValidationType.BODY
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (dtoClass.name === "IdDto") {
      const id = req[type].id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          message: messageService.badRequest(),
          error: "Invalid ID",
        });
      }
    }
    const output = plainToInstance(dtoClass, req[type]);
    const errors = await validate(output, {
      whitelist: true,
    });

    if (errors.length > 0) {
      const messages = errors.flatMap((err) =>
        Object.values(err.constraints || {})
      );
      return res.status(400).json({
        message: messages[0],
        error: messageService.badRequest(),
        errors: messages,
      });
    }

    req[type] = output;
    next();
  };
}
