import BaseRouter from "../entities/router";
import apiController from "../controllers/api";

class Router extends BaseRouter {
  routes(): void {
    this.router
      .post("/login", apiController.adminLogin)
      .post("/", apiController.addData)
      .get("/", apiController.getUsers)
      .get("/:id", apiController.getById)
      .put("/:id", apiController.updateData);
  }
}

const router = new Router().router;

export default router;
