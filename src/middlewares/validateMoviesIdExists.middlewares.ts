import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { ErrorApp } from "../errors/errors";
import { MovieRepository } from "../interfaces/movies.interfaces";

const validateMoviesIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository: MovieRepository = AppDataSource.getRepository(Movie);

  const id = parseInt(req.params.id);

  const movieFound = await repository.findOne({ where: { id: id } });

  if (!movieFound) {
    throw new ErrorApp("Movie not found", 404);
  }

  return next();
};

export default validateMoviesIdExists;
