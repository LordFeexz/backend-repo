import BaseRouter from "../entities/router";
import user from "./userCollection";

class Router extends BaseRouter {
  routes(): void {
    this.router.use("/user", user);
  }
}

const router = new Router().router;

export default router;
