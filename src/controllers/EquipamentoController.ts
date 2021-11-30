import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { EquipamentoNaoExiste } from "../@types/errors/EquipamentoNaoExiste";
import { EquipamentoJaExiste } from "../@types/errors/EquipamentoJaExiste";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";

@Service("EquipamentoController")
export class EquipamentoController {
  constructor(
    @Inject("EquipamentoService")
    private equipamentoService: IEquipamentoService
  ) {}

  async criar(req: RequestWithUserData, res: Response): Promise<void> {
    try {
      const authorization = req.headers.authorization;
      const equipamento = await this.equipamentoService.criarEquipamento(
        authorization,
        req.body
      );

      res.status(201).send(equipamento);
      return;
    } catch (error) {
      if (error instanceof EquipamentoJaExiste) {
        res.status(422).send({ error });
        return;
      }

      if (error instanceof TipoEquipamentoNaoExiste) {
        res.status(400).send({ error });
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      await this.equipamentoService.atualizarEquipamento(
        Number(req.params.id),
        req.body
      );

      res.status(200).send();
    } catch (error) {
      if (error instanceof EquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const equipamentos = await this.equipamentoService.listarEquipamentos();
      res.send(equipamentos).status(200);
    } catch {
      res.status(500).send("erro interno do servidor");
    }
  }

  async buscar(req: Request, res: Response): Promise<void> {
    try {
      const equipamento = await this.equipamentoService.buscarEquipamento(
        Number(req.params.id)
      );
      res.status(200).send(equipamento);
    } catch (error) {
      if (error instanceof EquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async inativarEquipamento(
    req: RequestWithUserData,
    res: Response
  ): Promise<void> {
    try {
      const authorization = req.headers.authorization;
      await this.equipamentoService.inativarEquipamento(
        authorization,
        Number(req.params.id)
      );

      res.status(200).send();
      return;
    } catch (error) {
      if (error instanceof EquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }
}
