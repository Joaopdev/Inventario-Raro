import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { TipoEquipamentoJaExiste } from "../@types/errors/TipoEquipamentoJaExiste";

@Service("TipoEquipamentoController")
export class TipoEquipamentoController {
  constructor(
    @Inject("TipoEquipamentoService")
    private tipoEquipamentoService: ITipoEquipamentoService
  ) {}

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const tipoEquipamento =
        await this.tipoEquipamentoService.criarTipoEquipamento(req.body);

      res.status(201).send(tipoEquipamento);
      return;
    } catch (error) {
      if (error instanceof TipoEquipamentoJaExiste) {
        res.status(422).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      await this.tipoEquipamentoService.atualizarTipoEquipamento(
        Number(req.params.id),
        req.body
      );

      res.status(200).send();
    } catch (error) {
      if (error instanceof TipoEquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async remover(req: Request, res: Response): Promise<void> {
    try {
      await this.tipoEquipamentoService.removerTipoEquipamento(
        Number(req.params.id)
      );

      res.status(200).send();
      return;
    } catch (error) {
      if (error instanceof TipoEquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    const tipoEquipamentos =
      await this.tipoEquipamentoService.listarTipoEquipamento();
    res.send(tipoEquipamentos).status(200);
  }

  async buscar(req: Request, res: Response): Promise<void> {
    try {
      const tipoEquipamento =
        await this.tipoEquipamentoService.buscarTipoEquipamento(
          Number(req.params.id)
        );
      res.status(200).send(tipoEquipamento);
    } catch (error) {
      if (error instanceof TipoEquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }

  async buscarTipoEquipamentoComEquipamentos(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const tipoEquipamento =
        await this.tipoEquipamentoService.buscarTipoEquipamentoComEquipamentos(
          Number(req.params.id)
        );
      res.status(200).send(tipoEquipamento);
    } catch (error) {
      if (error instanceof TipoEquipamentoNaoExiste) {
        res.status(404).send();
        return;
      }
      res.status(500).send("erro interno do servidor");
    }
  }
}
