import { TipoEquipamentoController } from "../controllers/TipoEquipamentoController";
import { RequestHandler, Router } from "express";
import Container from "typedi";
const router = Router();

const getController = (): TipoEquipamentoController => {
  return Container.get<TipoEquipamentoController>("TipoEquipamentoController");
};

const createRouter = (): Router => {
  router.get("", (async (req, res) => {
    await getController().listar(req, res);
  }) as RequestHandler);
  return router;
};

export default createRouter;
