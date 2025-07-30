// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../env";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Unexpected Error:", err); // helpful for debugging

  res.status(500).json({
    message: "Something went wrong",
    error: "Unexpected Error",
    details: NODE_ENV === "development" ? err.message : undefined,
  });
}
