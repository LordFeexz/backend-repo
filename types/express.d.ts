import type { IAdmin } from "../interfaces/admin";

export declare global {
  namespace Express {
    interface Request {
      admin?: IAdmin;
    }
  }
}
