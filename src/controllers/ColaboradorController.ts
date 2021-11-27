import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IColaboradorService } from "../@types/services/IColaboradorService";
import { ColaboradorNaoExiste } from "../@types/errors/ColaboradorNaoExiste";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { ColaboradorJaExiste } from "../@types/errors/ColaboradorJaExiste";

@Service("ColaboradorController")
export class ColaboradorController {
  constructor(
    @Inject("ColaboradorService")
    private colaboradorService: IColaboradorService
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
      response.send(colaborador).status(200);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(404).send();
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async criar(request: Request, response: Response): Promise<void> {
    try {
      const colaborador = await this.colaboradorService.criar(request.body);
      response.send(colaborador).status(201);
      return;
    } catch (error) {
      if (error instanceof ColaboradorJaExiste) {
        response.status(422).send({ error });
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async atualizar(request: Request, response: Response): Promise<void> {
    try {
      await this.colaboradorService.atualizar(
        Number(request.params.id),
        request.body
      );
      response.send().status(200);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(404).send();
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }

  async remover(request: Request, response: Response): Promise<void> {
    try {
      await this.colaboradorService.remover(Number(request.params.id));
      response.send().status(200);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(404).send();
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }
  async buscaEquipamentoDoColaborador(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const colaboradorEquipamento =
        await this.colaboradorService.buscarEquipamentoDoColaborador(
          Number(request.params.id)
        );
      response.send(colaboradorEquipamento).status(200);
      return;
    } catch (error) {
      if (error instanceof ColaboradorNaoExiste) {
        response.status(404).send();
      }
      response.status(500).send("erro interno do servidor");
    }
  }
  async gerarMovimentacao(
    request: RequestWithUserData,
    response: Response
  ): Promise<void> {
    try {
      const authorization = request.headers.authorization;
      const movimentacao =
        await this.colaboradorService.geraMovimentacaoColaborador(
          authorization,
          request.body
        );
      response.send(movimentacao).status(201);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(422).send({ error });
        return;
      }
      response.status(500).send("erro interno do servidor");
    }
  }
}
