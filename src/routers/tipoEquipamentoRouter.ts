import { TipoEquipamentoController } from "../controllers/TipoEquipamentoController";
import { RequestHandler, Router } from "express";
import Container from "typedi";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
const router = Router();

const getController = (): TipoEquipamentoController => {
  return Container.get<TipoEquipamentoController>("TipoEquipamentoController");
};

const createRouter = (): Router => {
  router.get("", (async (req, res) => {
    await getController().listar(req, res);
  }) as RequestHandler);

  router.post("", (async (req: RequestWithUserData, res) => {
    await getController().criar(req, res);
  }) as RequestHandler);

  router.get("/:id", (async (req, res) => {
    await getController().buscar(req, res);
  }) as RequestHandler);

  router.patch("/:id", (async (req, res) => {
    await getController().atualizar(req, res);
  }) as RequestHandler);

  router.delete("/:id", authorizationMiddleware, (async (req, res) => {
    await getController().remover(req, res);
  }) as RequestHandler);

  router.get("/:id/equipamentos", (async (req, res) => {
    await getController().buscarTipoEquipamentoComEquipamentos(req, res);
  }) as RequestHandler);

  return router;
};

export default createRouter;
