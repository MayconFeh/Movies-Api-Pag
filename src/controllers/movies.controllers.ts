import { Request, Response } from "express";
import {
  MovieCreate,
  MovieUpdate,
  MovieRead,
} from "../interfaces/movies.interfaces";
import { movieSortSchema } from "../schemas/movies.schemas";
import { moviesServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const movie: MovieCreate = req.body;

  const newMovie = await moviesServices.create(movie);

  return res.status(201).json(newMovie);
};

const read = async (req: Request, res: Response): Promise<Response<MovieRead>> => {
  const { page, perPage, order, sort } = req.query;

  const newSort = movieSortSchema.parse(sort);

  const movies = await moviesServices.read(page, perPage, order, newSort);

  return res.status(200).json(movies);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const payload: MovieUpdate = req.body;

  const id: number = parseInt(req.params.id);

  const movie = await moviesServices.update(payload, id);

  return res.status(200).json(movie);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);

  await moviesServices.destroy(id);

  return res.status(204).send();
};

export default { create, read, update, destroy };
