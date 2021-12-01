import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { RequestHandler, Router } from "express";
import Container from "typedi";
const router = Router();
import { UsuarioController } from "../controllers/UsuarioController";
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>("UsuarioController");
};

const createRouter = (): Router => {
  router.get("/me", authenticationMiddleware, (async (
    req: RequestWithUserData,
    res
  ) => {
    await getController().buscarMeusDados(req, res);
  }) as RequestHandler);
  router.get("", authenticationMiddleware, authorizationMiddleware, (async (
    req,
    res
  ) => {
    await getController().listar(req, res);
  }) as RequestHandler);
  router.post("", (async (req, res) => {
    await getController().criar(req, res);
  }) as RequestHandler);
  router.get("/:id", authenticationMiddleware, authorizationMiddleware, (async (
    req,
    res
  ) => {
    await getController().buscar(req, res);
  }) as RequestHandler);
  router.patch(
    "/:id",
    authenticationMiddleware,
    authorizationMiddleware,
    (async (req: RequestWithUserData, res) => {
      await getController().atualizar(req, res);
    }) as RequestHandler
  );
  router.delete(
    "/:id",
    authenticationMiddleware,
    authorizationMiddleware,
    (async (req, res) => {
      await getController().remover(req, res);
    }) as RequestHandler
  );

  return router;
};

export default createRouter;
