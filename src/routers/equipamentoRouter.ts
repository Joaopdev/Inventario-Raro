import { EquipamentoController } from "../controllers/EquipamentoController";
import { RequestHandler, Router } from "express";
import Container from "typedi";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
const router = Router();

const getController = (): EquipamentoController => {
  return Container.get<EquipamentoController>("EquipamentoController");
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

  router.delete("/:id", (async (req, res) => {
    await getController().remover(req, res);
  }) as RequestHandler);

  router.post("/calloff/:id", (async (req: RequestWithUserData, res) => {
    await getController().suspendeEquipamento(req, res);
  }) as RequestHandler);
  return router;
};

export default createRouter;
