import * as express from "express";
import createUserRouter from "./userRouter";
import createEnderecoRouter from "./enderecoRouter";
import createColaboradorRouter from "./colaboradorRouter";
import createTipoEquipamentoRouter from "./tipoEquipamentoRouter";

const createRouters = (app: express.Express): void => {
  app.use("/users", createUserRouter());
  app.use("/enderecos", createEnderecoRouter());
  app.use("/colaboradores", createColaboradorRouter());
  app.use("/tipo-equipamentos", createTipoEquipamentoRouter());
};

export default createRouters;
