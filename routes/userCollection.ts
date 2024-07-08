import BaseRouter from "../entities/router";
import apiController from "../controllers/api";

class Router extends BaseRouter {
  routes(): void {
    this.router
      .post("/login", apiController.adminLogin)
      .post("/", apiController.addData)
      .put("/:id", apiController.updateData);
  }
}

const router = new Router().router;

export default router;
