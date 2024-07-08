import type { Response } from "express";
import { RESPONSE_NAME } from "../constants";

export const sendResponseBody = (
  { res, code, message, data }: SendResponseBodyProps,
  pagination?: IPaginationProps
) => {
  res
    .status(code)
    .json({ message, data, code, name: RESPONSE_NAME[code], ...pagination });
};

export interface SendResponseBodyProps {
  res: Response;
  code: number;
  message: string;
  data?: any;
}

export interface IPaginationProps {
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
}
