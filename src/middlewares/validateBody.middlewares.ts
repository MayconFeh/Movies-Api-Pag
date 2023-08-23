import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const validateBody =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    
    return next();
  };

export default validateBody;