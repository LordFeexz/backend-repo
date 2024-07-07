import type { Request, Response, NextFunction } from "express";
import ApiError from "../entities/apiError";
import { sendResponseBody } from "../entities/response";

class ErrorHandler {
  public catch(
    err: Error | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let message =
      err instanceof ApiError ? err.message : "Internal Server Error";

    let status = err instanceof ApiError ? err.statusCode : 500;

    sendResponseBody({
      res,
      code: status,
      message,
      data: err?.data,
    });
  }
}

export default new ErrorHandler().catch;
