import BaseRouter from "../entities/router";
import apiController from "../controllers/api";
import authMiddleware from "../middlewares/authMiddleware";

class Router extends BaseRouter {
  routes(): void {
    this.router
      .post("/login", apiController.adminLogin)
      .post("/", authMiddleware, apiController.addData)
      .get("/", apiController.getUsers)
      .get("/:id", apiController.getById)
      .put("/:id", authMiddleware, apiController.updateData);
  }
}

const router = new Router().router;

export default router;
