import { RequestHandler, Router } from "express";
import Container from "typedi";
const router = Router();
import { UsuarioController } from "../controllers/UsuarioController";

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>("UsuarioController");
};

const createRouter = () => {
  router.get("", (async (req, res) => {
    await getController().listar(req, res);
  }) as RequestHandler);
  router.post("", (async (req, res) => {
    await getController().criar(req, res);
  }) as RequestHandler);
  router.get("/:id", (async (req, res) => {
    await getController().buscar(req, res);
  }) as RequestHandler);
  router.patch("", (async (req, res) => {
    await getController().atualizar(req, res);
  }) as RequestHandler);
  router.delete("/:id", (async (req, res) => {
    await getController().remover(req, res);
  }) as RequestHandler);

  return router;
};

export default createRouter;
