import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IColaboradorService } from "../@types/services/IColaboradorService";
import { ColaboradorNaoExiste } from "../@types/errors/ColaboradorNaoExiste";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";

@Service("ColaboradorController")
export class ColaboradorController {
  constructor(
    @Inject("ColaboradorService")
    private colaboradorService: IColaboradorService,
    @Inject("EquipamentoService")
    private equipamentoService: IEquipamentoService
  ) {}

  async listar(request: Request, response: Response): Promise<void> {
    const colaboradores = await this.colaboradorService.listar();
    response.send(colaboradores).status(200);
    return;
  }

  async buscar(request: Request, response: Response): Promise<void> {
    try {
      const colaborador = await this.colaboradorService.buscar(
        Number(request.params.id)
      );
      response.send(colaborador);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(204).send(new ColaboradorNaoExiste());
        return;
      }
    }
  }

  async criar(request: Request, response: Response): Promise<void> {
    const colaborador = await this.colaboradorService.criar(request.body);
    response.send(colaborador);
  }

  async atualizar(request: Request, response: Response): Promise<void> {
    try {
      const colaborador = await this.colaboradorService.atualizar(
        Number(request.params.id),
        request.body
      );
      response.send(colaborador).status(200);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(204).send(new ColaboradorNaoExiste());
        return;
      }
    }
  }

  async remover(request: Request, response: Response): Promise<void> {
    try {
      const colaborador = await this.colaboradorService.remover(
        Number(request.params.id)
      );
      response.send("sucesso na remoção").status(200);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(204).send(new ColaboradorNaoExiste());
        return;
      }
    }
  }
  async buscaEquipamentoDoColaborador(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const equipamento =
        await this.equipamentoService.buscarEquipamentoDoColaborador(
          Number(request.params.id)
        );
      response.send(equipamento);
      return;
    } catch (error) {
      if (error) {
        return;
      }
    }
  }
}
