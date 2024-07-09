import type { Request, Response, NextFunction } from "express";
import ApiError from "../entities/apiError";
import { sendResponseBody } from "../entities/response";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

class ErrorHandler {
  public catch(
    err: Error | ApiError | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let message =
      err instanceof ApiError ? err.message : "Internal Server Error";

    let status = err instanceof ApiError ? err.statusCode : 500;

    if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
      message = "missing or invalid authorization";
      status = 401;
    }

    sendResponseBody({
      res,
      code: status,
      message,
      data: err?.data,
    });
  }
}

export default new ErrorHandler().catch;
