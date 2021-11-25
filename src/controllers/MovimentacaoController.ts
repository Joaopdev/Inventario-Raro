import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";

@Service("MovimentacaoController")
export class MovimentacaoController {
  constructor(
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService
  ) {}

  async listar(request: Request, response: Response): Promise<void> {
    const tipo = request.query.tipo as TipoMovimentacao;
    const movimentacoes =
      await this.movimentacaoService.listarPorTipoMovimentacao(tipo);
    response.send(movimentacoes).status(200);
    return;
  }
  async buscar(request: Request, response: Response): Promise<void> {
    try {
      const movimentacao = await this.movimentacaoService.buscar(
        Number(request.params.id)
      );
      response.send(movimentacao).status(200);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send();
        return;
      }
    }
  }
  async buscarPeloEquipamento(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const movimentacao = await this.movimentacaoService.buscarPeloEquipamento(
        Number(request.params.id)
      );
      response.send(movimentacao).status(200);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send();
        return;
      }
    }
  }
  async buscarPeloColaborador(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const movimentacao = await this.movimentacaoService.buscarPeloColaborador(
        Number(request.params.id)
      );
      response.send(movimentacao).status(200);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send();
        return;
      }
    }
  }

  async criar(request: RequestWithUserData, response: Response): Promise<void> {
    const authorization = request.headers.authorization;
    const movimentacao = await this.movimentacaoService.criar(
      authorization,
      request.body
    );
    response.send(movimentacao).status(201);
    return;
  }

  async atualizar(request: Request, response: Response): Promise<void> {
    try {
      const movimentacao = await this.movimentacaoService.atualizar(
        Number(request.params.id),
        request.body
      );
      response.send().status(200);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send();
        return;
      }
    }
  }
  async remover(request: Request, response: Response): Promise<void> {
    try {
      const movimentacao = await this.movimentacaoService.remover(
        Number(request.params.id)
      );
      response.send().status(200);
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send();
        return;
      }
    }
  }
}
