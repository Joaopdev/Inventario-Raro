import { ColaboradorController } from "controllers/ColaboradorController";
import { Router } from "express";
import Container from "typedi";
const router = Router();

const getController = (): ColaboradorController => {
  return Container.get<ColaboradorController>("ColaboradorController");
};

const createRouter = () => {
  router.get("", (req, res) => getController().list(req, res));
  router.post("", (req, res) => getController().create(req, res));
  router.get("", (req, res) => getController().get(req, res));
  router.patch("", (req, res) => getController().update(req, res));
  router.delete("", (req, res) => getController().remove(req, res));

  return router;
};

export default createRouter;
