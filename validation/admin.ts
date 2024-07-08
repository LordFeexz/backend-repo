import BaseValidator from "../entities/validator";
import * as yup from "yup";
import type { IAdminLogin } from "../interfaces/admin";

class AdminValidator extends BaseValidator {
  public validateLogin = async (data: any) =>
    await this.validate<IAdminLogin>(
      yup.object().shape({
        email: yup
          .string()
          .email("invalid email format")
          .required("email is required"),
        password: yup.string().required("password is required"),
      }),
      data
    );
}

const adminValidator = new AdminValidator();

export default adminValidator;
