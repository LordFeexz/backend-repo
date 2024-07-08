import * as yup from "yup";
import BaseValidator from "../entities/validator";
import type { IAddUser, IParamsId } from "../interfaces/user";
import type { IBaseQuery } from "../interfaces";

class UserValidator extends BaseValidator {
  public validateAddUser = async (data: any) =>
    await this.validate<IAddUser>(
      yup.object().shape({
        name: yup.string().required("name is required"),
        email: yup
          .string()

          .email("invalid email format")
          .required("email is required"),
        username: yup.string().required("username is required"),
      }),
      data
    );

  public validateParamsId = async (data: any) =>
    await this.validate<IParamsId>(
      yup.object().shape({
        id: yup.string().uuid("invalid id").required("id is required"),
      }),
      data
    );

  public validateUpdateUser = async (data: any, defaultValue: IAddUser) =>
    await this.validate<IAddUser>(
      yup.object().shape({
        name: yup.string().default(defaultValue.name).optional(),
        email: yup
          .string()
          .email("invalid email format")
          .default(defaultValue.email)
          .optional(),
        username: yup.string().default(defaultValue.username).optional(),
      }),
      data
    );

  public validateQueryGetUser = async (data: any) =>
    await this.validate<IBaseQuery>(
      yup.object().shape({
        page: yup
          .number()
          .positive("must be a positive number")
          .default(1)
          .optional(),
        limit: yup
          .number()
          .positive("must be a positive number")
          .default(10)
          .optional(),
      }),
      data
    );
}

const userValidator = new UserValidator();

export default userValidator;
