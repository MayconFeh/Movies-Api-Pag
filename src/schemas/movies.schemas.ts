import { z } from "zod";

const moviesCreateSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullable().optional(),
  duration: z.number().positive(),
  price: z.number().positive().int(),
})

const movieReturnSchema = moviesCreateSchema.extend({ id: z.number(), })

const moviesReadSchema = movieReturnSchema.array()

const moviesUpdateSchema = movieReturnSchema.partial()

const movieSortSchema = z.enum(["id", "duration", "price"]).default("id")

const moviePaginationSchema = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number().min(0),
  data: moviesReadSchema,
})

export {
  moviesCreateSchema,
  movieReturnSchema,
  moviesReadSchema,
  moviesUpdateSchema,
  movieSortSchema,
  moviePaginationSchema
}