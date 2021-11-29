import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import Container from "typedi";
const router = Router();
import { EnderecoController } from "../controllers/EnderecoController";

const getController = (): EnderecoController => {
  return Container.get<EnderecoController>("EnderecoController");
};

const createRouter = (): Router => {
  router.get("/:cep", (async (req, res) => {
    await getController().get(req, res);
  }) as RequestHandler);

  return router;
};

export default createRouter;
