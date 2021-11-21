import { Router } from "express";
import Container from "typedi";
const router = Router();
import { UsuarioController } from "../controllers/UsuarioController";

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>("UsuarioController");
};

const createRouter = () => {
  router.get("", (req, res) => getController().listar(req, res));
  router.post("", (req, res) => getController().criar(req, res));
  router.get("/:id", (req, res) => getController().buscar(req, res));
  router.patch("/", (req, res) => getController().atualizar(req, res));
  router.delete("/:id", (req, res) => getController().remover(req, res));

  return router;
};

export default createRouter;
