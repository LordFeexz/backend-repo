import * as yup from "yup";
import ApiError from "./apiError";

export default abstract class BaseValidator {
  protected async validate<T = any>(schema: yup.Schema, data: any): Promise<T> {
    try {
      return (await schema.validate(data, {
        stripUnknown: true,
        abortEarly: false,
      })) as T;
    } catch (err) {
      const { errors } = err as { errors: string[] };

      throw new ApiError({
        message: errors?.length
          ? errors.join(",\n ")
          : errors[0] ?? "unexpected error",
        statusCode: 400,
      });
    }
  }
}
