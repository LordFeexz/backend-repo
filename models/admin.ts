import { v4 } from "uuid";
import { db } from "../config/firebaseConfig";
import type { IAdmin } from "../interfaces/admin";

export class Admin implements IAdmin {
  public id!: string;

  constructor(public email: string, public password: string) {
    this.email = email;
    this.password = password;
    this.id = v4();
  }
}

export const adminCollection = db.collection("admins");
