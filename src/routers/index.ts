import * as express from "express";
import createUsuarioRouter from "./usuarioRouter";
import createEnderecoRouter from "./enderecoRouter";
import createColaboradorRouter from "./colaboradorRouter";
import createTipoEquipamentoRouter from "./tipoEquipamentoRouter";
import createMovimentacaoRouter from "./movimentacaoRouter";

const createRouters = (app: express.Express): void => {
  app.use("/usuarios", createUsuarioRouter());
  app.use("/enderecos", createEnderecoRouter());
  app.use("/colaboradores", createColaboradorRouter());
  app.use("/tipo-equipamentos", createTipoEquipamentoRouter());
  app.use("/movimentacoes", createMovimentacaoRouter());
};

export default createRouters;
