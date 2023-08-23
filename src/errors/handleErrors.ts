import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorApp } from "./errors";

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next:NextFunction
) => {
  if (err instanceof ErrorApp) {
    return res.status(err.codestatus).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.flatten().fieldErrors });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error." });
};

export { handleErrors }