import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../entities";
import {
  moviesCreateSchema,
  movieReturnSchema,
  moviesUpdateSchema,
  moviesReadSchema,
  movieSortSchema,
  moviePaginationSchema,
} from "../schemas/movies.schemas";

type MovieCreate = z.infer<typeof moviesCreateSchema>;
type MovieUpdate = DeepPartial<Movie>;
type MovieUpdateBody = z.infer<typeof moviesUpdateSchema>;
type MovieRepository = Repository<Movie>;
type MovieReturn = z.infer<typeof movieReturnSchema>;
type MovieRead = z.infer<typeof moviesReadSchema>;
type MovieSort = z.infer<typeof movieSortSchema>;
type MoviePagination = z.infer<typeof moviePaginationSchema>;

export {
  MovieCreate,
  MovieUpdateBody,
  MovieUpdate,
  MovieRepository,
  MovieReturn,
  MovieRead,
  MovieSort,
  MoviePagination,
};
