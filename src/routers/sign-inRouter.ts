import { RequestHandler, Router } from "express";
import Container from "typedi";
const router = Router();
import { UsuarioController } from "../controllers/UsuarioController";

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>("UsuarioController");
};

const createRouter = (): Router => {
  router.post("", (async (req, res) => {
    await getController().autenticar(req, res);
  }) as RequestHandler);

  return router;
};

export default createRouter;
