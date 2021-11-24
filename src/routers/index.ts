import * as express from "express";
import createUsuarioRouter from "./usuarioRouter";
import createEnderecoRouter from "./enderecoRouter";
import createColaboradorRouter from "./colaboradorRouter";
import createTipoEquipamentoRouter from "./tipoEquipamentoRouter";
import createEquipamentoRouter from "./EquipamentoRouter";

const createRouters = (app: express.Express): void => {
  app.use("/usuarios", createUsuarioRouter());
  app.use("/enderecos", createEnderecoRouter());
  app.use("/colaboradores", createColaboradorRouter());
  app.use("/tipo-equipamentos", createTipoEquipamentoRouter());
  app.use("/equipamentos", createEquipamentoRouter());
};

export default createRouters;
