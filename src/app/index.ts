import * as express from "express";
import * as morgan from "morgan";
import api from "../api";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api", api());

export default app;
