import type { Request, Response, NextFunction } from "express";
import userValidator from "../validation/user";
import { User, userCollection } from "../models/user";
import { sendResponseBody } from "../entities/response";
import ApiError from "../entities/apiError";
import { v4 } from "uuid";

class ApiController {
  public async updateData(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await userValidator.validateParamsId(req.params);

      const docs = await userCollection.where("id", "==", id).get();
      if (!docs || docs.empty)
        throw new ApiError({ message: "user not found", statusCode: 404 });

      const { name, email, username } = await userValidator.validateUpdateUser(
        req.body,
        docs.docs[0].data() as User
      );

      await userCollection
        .doc(docs.docs[0].id)
        .update({ name, email, username });
      sendResponseBody({
        res,
        code: 200,
        message: "user updated",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async addData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, username } = await userValidator.validateAddUser(
        req.body
      );

      const exists = await userCollection
        .where("email", "==", email)
        .where("username", "==", username)
        .get();

      if (!exists.empty)
        exists.docs.forEach((el) => {
          if (el.exists) {
            const data = el.data() as User;
            if (data.email === email)
              throw new ApiError({
                message: "email is already exists",
                statusCode: 409,
              });

            if (data.username === username)
              throw new ApiError({
                message: "username is already exists",
                statusCode: 409,
              });
          }
        });

      await userCollection.add({ name, email, username, id: v4() });
      sendResponseBody({
        res,
        code: 201,
        message: "user created",
      });
    } catch (err) {
      next(err);
    }
  }
}

const apiController = new ApiController();

export default apiController;
