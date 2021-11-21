import { Router } from "express";
import Container from "typedi";
const router = Router();
import { UsuarioController } from "../controllers/UsuarioController";

const getController = (): UsuarioController => {
  return Container.get<UsuarioController>("UsuarioController");
};

const createRouter = () => {
  router.get("", (req, res) => getController().list(req, res));
  router.post("", (req, res) => getController().create(req, res));
  router.get("/:id", (req, res) => getController().get(req, res));
  router.patch("/", (req, res) => getController().update(req, res));
  router.delete("/:id", (req, res) => getController().remove(req, res));

  return router;
};

export default createRouter;
