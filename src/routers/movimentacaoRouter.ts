import { RequestHandler, Router } from "express";
import Container from "typedi";
import { MovimentacaoController } from "../controllers/MovimentacaoController";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
const router = Router();

const getController = (): MovimentacaoController => {
  return Container.get<MovimentacaoController>("MovimentacaoController");
};

const createRouter = (): Router => {
  router.get("", (async (req, res) => {
    await getController().listar(req, res);
  }) as RequestHandler);
  router.get(
    "/:id",
    (async (req, res) =>
      await getController().buscar(req, res)) as RequestHandler
  );
  router.get(
    "/equipamento/:id",
    (async (req, res) =>
      await getController().buscarPeloEquipamento(req, res)) as RequestHandler
  );
  router.get(
    "/colabador/:id",
    (async (req, res) =>
      await getController().buscarPeloColaborador(req, res)) as RequestHandler
  );
  router.patch(
    "/:id",
    (async (req, res) =>
      await getController().atualizar(req, res)) as RequestHandler
  );
  router.delete(
    "/:id",
    authorizationMiddleware,
    (async (req, res) =>
      await getController().remover(req, res)) as RequestHandler
  );
  return router;
};
export default createRouter;
