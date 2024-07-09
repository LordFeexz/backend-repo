import type { Request, Response, NextFunction } from "express";
import ApiError from "../entities/apiError";
import encryption from "../utils/encryption";
import { adminCollection } from "../models/admin";
import type { IAdmin } from "../interfaces/admin";

class AuthMiddleware {
  public async auth(req: Request, res: Response, next: NextFunction) {
    try {
      /**
       * INFO
       * All Error will be 'missing or invalid authorization' to prevent attacker
       */
      const { authorization } = req.headers;
      if (!authorization)
        throw new ApiError({
          message: "missing or invalid authorization",
          statusCode: 401,
        });

      if (!authorization.startsWith("Bearer "))
        throw new ApiError({
          message: "missing or invalid authorization",
          statusCode: 401,
        });

      const token = authorization.split(" ")[1];
      if (!token)
        throw new ApiError({
          message: "missing or invalid authorization",
          statusCode: 401,
        });

      const { id } = encryption.verifyToken(token);
      const admin = await adminCollection.where("id", "==", id).get();
      if (!admin || admin.empty)
        throw new ApiError({
          message: "missing or invalid authorization",
          statusCode: 401,
        });

      /**
       * INFO
       * bring admin data to request
       */
      req.admin = admin.docs[0].data() as IAdmin;

      next();
    } catch (err) {
      next(err);
    }
  }
}

const authMiddleware = new AuthMiddleware();

export default authMiddleware.auth;
