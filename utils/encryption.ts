import { hashSync, compareSync } from "bcryptjs";
import { sign, verify, type JwtPayload } from "jsonwebtoken";

export interface ITokenProps {
  email: string;
  id: string;
}

export type ITokenValue = ITokenProps & JwtPayload;

class Encryption {
  public hashData = (data: string) => hashSync(data, 10);

  public compareData = (data: string, hash: string) => compareSync(data, hash);

  public createToken = (data: ITokenProps) => sign(data, process.env.SECRET);

  public verifyToken = (token: string) =>
    verify(token, process.env.SECRET) as ITokenValue;
}

const encryption = new Encryption();

export default encryption;
