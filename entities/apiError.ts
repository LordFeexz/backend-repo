import { RESPONSE_NAME } from "../constants";

export default class ApiError extends Error {
  public statusCode: number;
  public data?: any;
  constructor({ message, statusCode, data }: ApiErrorConstructor) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.statusCode = statusCode;
    this.data = data;
    this.name = RESPONSE_NAME[this.statusCode];
  }
}

export interface ApiErrorConstructor {
  message: string;
  statusCode: number;
  data?: any;
}
