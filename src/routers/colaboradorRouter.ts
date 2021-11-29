import { ColaboradorController } from "../controllers/ColaboradorController";
import { RequestHandler, Router } from "express";
import Container from "typedi";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
const router = Router();

const getController = (): ColaboradorController => {
  return Container.get<ColaboradorController>("ColaboradorController");
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
  router.post(
    "",
    (async (req, res) =>
      await getController().criar(req, res)) as RequestHandler
  );
  router.post(
    "/:id/movimentacao",
    (async (req: RequestWithUserData, res) =>
      await getController().gerarMovimentacao(req, res)) as RequestHandler
  );
  router.patch(
    "/:id",
    (async (req, res) =>
      await getController().atualizar(req, res)) as RequestHandler
  );
  router.delete(
    "/:id",
    (async (req, res) =>
      await getController().inativar(req, res)) as RequestHandler
  );
  router.get(
    "/:id/equipamentos",
    (async (req, res) =>
      await getController().buscaEquipamentoDoColaborador(
        req,
        res
      )) as RequestHandler
  );

  return router;
};

export default createRouter;
