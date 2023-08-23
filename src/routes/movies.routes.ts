import { Router } from "express";
import { moviesControllers } from "../controllers";
import middlewares from "../middlewares";
import { moviesCreateSchema,moviesUpdateSchema } from "../schemas/movies.schemas";

const movieRouter : Router = Router()

movieRouter.use("/:id", middlewares.validateMoviesIdExists)

movieRouter.post("", middlewares.validateMovieNameExists,middlewares.validateBody(moviesCreateSchema),moviesControllers.create)

movieRouter.get("", moviesControllers.read)

movieRouter.patch("/:id", middlewares.validateBody(moviesUpdateSchema),middlewares.validateMovieNameExists, moviesControllers.update)

movieRouter.delete("/:id", moviesControllers.destroy)

export default movieRouter;