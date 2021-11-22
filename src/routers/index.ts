import * as express from "express";
import createUserRouter from "./userRouter";
import createEnderecoRouter from "./enderecoRouter";
import createColaboradorRouter from "./colaboradorRouter";

const createRouters = (app: express.Express): void => {
  // app.use("/users", createUserRouter());
  app.use("/enderecos", createEnderecoRouter());
  app.use("/colaboradores", createColaboradorRouter());
};

export default createRouters;
