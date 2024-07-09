import BaseRouter from "../entities/router";
import apiController from "../controllers/api";
import authMiddleware from "../middlewares/authMiddleware";

class Router extends BaseRouter {
  routes(): void {
    this.router
      .post("/login", apiController.adminLogin)
      .post("/", authMiddleware.auth, apiController.addData)
      .get("/", apiController.getUsers)
      .put("/", authMiddleware.auth, apiController.updateData);
  }
}

const router = new Router().router;

export default router;
