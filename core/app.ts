import express, { type Application, json, urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import { format } from "date-fns";
import errorHandler from "../middlewares/errorHandler";
import router from "../routes";
import ApiError from "../entities/apiError";

config();

class App {
  public readonly application: Application;
  constructor() {
    this.application = express();
    this.plugins();
    this.routes();
    this.errorHandling();
  }

  public runApp() {
    this.application.listen(process.env.PORT ?? 3001, () => {
      console.log(`Server running on port ${process.env.PORT ?? 3001}`);
    });
  }

  private plugins() {
    morgan.token("date", () =>
      format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    );
    morgan.format(
      "production",
      '[:date[Asia/Jakarta]] ":method :url" :status :res[content-length] - :response-time ms'
    );
    morgan.format(
      "dev",
      '[:date[Asia/Jakarta]] ":method :url" :status :res[content-length] - :response-time ms'
    );

    this.application
      .use(helmet({ referrerPolicy: { policy: "same-origin" } }))
      .use(cors())
      .use(morgan("combined"))
      .use(compression())
      .use(json())
      .use(
        urlencoded({ extended: true, limit: "50mb", parameterLimit: 100000000 })
      );
  }

  private routes() {
    this.application.use("/api/v1", router).use("*", (req, _, next) => {
      next(
        new ApiError({
          message: `Cannot ${req.method} ${req.url}`,
          statusCode: 404,
        })
      );
    });
  }

  private errorHandling() {
    this.application.use(errorHandler);
  }
}

const app = new App();

export default app.application;

app.runApp();
