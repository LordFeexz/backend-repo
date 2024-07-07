import { v4 } from "uuid";
import { db } from "../config/firebaseConfig";
import type { IUser } from "../interfaces/user";

export class User implements IUser {
  public id!: string;

  constructor(
    public name: string,
    public email: string,
    public username: string
  ) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.id = v4();
  }
}

export const userCollection = db.collection("users");
