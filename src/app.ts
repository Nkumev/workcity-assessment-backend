import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { config } from "dotenv";
import cors from "cors";

import { indexRouter } from "./routes/index";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { clientRouter } from "./routes/client";
import { projectRouter } from "./routes/project";
import { errorHandler } from "./lib/utils/error.handler";

config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  cors({
    origin: "http://localhost:3991",
    credentials: true,
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/project", projectRouter);
// catch 404 and forward to error handler
app.use("*", function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.use(errorHandler);

export default app;
