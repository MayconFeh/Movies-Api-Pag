import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { ErrorApp } from "../errors/errors";
import { MovieRepository } from "../interfaces/movies.interfaces";

const validateMovieNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository: MovieRepository = AppDataSource.getRepository(Movie);

  const name = req.body.name;
  
  if (name) {
    const nameFound = await repository.exist({
      where: { name: name },
    });

    if (nameFound) {
      throw new ErrorApp("Movie already exists.", 409);
    }
  }
  return next();
};

export default validateMovieNameExists;
