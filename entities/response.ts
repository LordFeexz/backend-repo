import type { Response } from "express";
import { RESPONSE_NAME } from "../constants";

export const sendResponseBody = ({
  res,
  code,
  message,
  data,
}: SendResponseBodyProps) => {
  res.status(code).json({ message, data, code, name: RESPONSE_NAME[code] });
};

export interface SendResponseBodyProps {
  res: Response;
  code: number;
  message: string;
  data?: any;
}
