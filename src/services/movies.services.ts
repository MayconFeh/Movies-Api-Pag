import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  MovieCreate,
  MovieReturn,
  MovieRepository,
  MovieSort,
  MoviePagination,
  MovieUpdate,
  MovieUpdateBody,
} from "../interfaces/movies.interfaces";
import {
  movieReturnSchema,
  moviesReadSchema,
  moviesUpdateSchema,
} from "../schemas/movies.schemas";

const create = async (payload: MovieCreate): Promise<MovieReturn> => {
  const repository: MovieRepository = AppDataSource.getRepository(Movie);

  const movie = repository.create(payload);
  await repository.save(movie);

  const result: MovieReturn = movieReturnSchema.parse(movie);

  return result;
};

const read = async (
  page: any,
  perPag: any,
  order: any,
  sort: MovieSort
): Promise<MoviePagination> => {
  const repository: MovieRepository = AppDataSource.getRepository(Movie);

  if (perPag > 5 || perPag < 0 || !perPag) perPag = 5;
  if (page < 0 || !page) page = 1;
  if (!order) order= "asc";

  const take = Number(perPag) || 5;
  const skip = Number(page) || 1;

  const params = {
    take,
    skip: take * (skip - 1),
    order: {},
  };

  if (sort != "id") {
    params.order = {
      [sort]: order,
    };
  } else {
    params.order = {
      id: "asc",
    };
  }

  const [foundMovies, totalMovies] = await repository.findAndCount(params);

  const movies = moviesReadSchema.parse(foundMovies);

  const count: number = totalMovies;

  const url: string = "http://localhost:3000/movies";

  let prev: string | null = `${url}?page=${skip - 1}&perPage=${take}`;

  if (skip - 1 <= 0) prev = null;

  let next: string | null = `${url}?page=${skip + 1}&perPage=${take}`;

  if (movies.length < take) next = null;

  const pagination: MoviePagination = {
    prevPage: prev,
    nextPage: next,
    count,
    data: movies,
  };

  return pagination;
};

const update = async (
  payload: MovieUpdate,
  idMovie: number
): Promise<MovieUpdateBody> => {
  const repository: MovieRepository = AppDataSource.getRepository(Movie);

  const foundMovie = await repository.findOneBy({ id: idMovie });

  const movie = repository.create({
    ...foundMovie,
    ...payload,
  });

  await repository.save(movie);

  const result = moviesUpdateSchema.parse(movie);

  return result;
};

const destroy = async (id: number):Promise<void> => {
  const repository: MovieRepository = AppDataSource.getRepository(Movie);

  const movie = await repository.findOne({
    where: {
      id: id,
    },
  });

  await repository.remove(movie!);
};

export default { create, read, update, destroy };