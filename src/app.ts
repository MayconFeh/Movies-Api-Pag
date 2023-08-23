import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors/handleErrors";
import movieRouter from "./routes/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", movieRouter);

app.use(handleErrors);

export default app;