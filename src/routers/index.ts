/* eslint-disable prettier/prettier */
import * as express from "express";
import createUsuarioRouter from "./usuarioRouter";
import createEnderecoRouter from "./enderecoRouter";
import createColaboradorRouter from "./colaboradorRouter";
import createTipoEquipamentoRouter from "./tipoEquipamentoRouter";
import createMovimentacaoRouter from "./movimentacaoRouter";
import createEquipamentoRouter from "./EquipamentoRouter";
import createAuthenticationRouter from "./sign-inRouter"
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const createRouters = (app: express.Express): void => {
  app.use("/usuarios/sign-in", createAuthenticationRouter());
  app.use("/usuarios", createUsuarioRouter());
  app.use("/enderecos", authenticationMiddleware, createEnderecoRouter());
  app.use("/colaboradores", authenticationMiddleware, createColaboradorRouter());
  app.use("/tipo-equipamentos", authenticationMiddleware, createTipoEquipamentoRouter());
  app.use("/movimentacoes", authenticationMiddleware, createMovimentacaoRouter());
  app.use("/equipamentos", authenticationMiddleware, createEquipamentoRouter());
};

export default createRouters;
