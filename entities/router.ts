import { Router } from "express";

export interface IRouter {
  router: Router;

  routes(): void;
}

export default abstract class BaseRouter implements IRouter {
  router: Router;

  abstract routes(): void;

  constructor() {
    this.router = Router();
    this.routes();
  }
}
