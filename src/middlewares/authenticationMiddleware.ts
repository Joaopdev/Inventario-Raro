import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const authenticationMiddleware = (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    const payload = verify(
      authorization,
      process.env.AUTH_SECRET
    ) as TokenPayload;
    req.usuario = payload;
  } catch (error) {
    res.status(403).send("Forbidden");
    return;
  }

  next();
};
