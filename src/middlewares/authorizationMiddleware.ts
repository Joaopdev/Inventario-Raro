import RequestWithUserData from "../@types/controllers/RequestWithUserData";

import { Response, NextFunction } from "express";

export const authorizationMiddleware = (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
): void => {
  const { usuario } = req;

  if (usuario.role !== "admin") {
    res.status(403).send("Forbidden");
    return;
  }

  next();
};
