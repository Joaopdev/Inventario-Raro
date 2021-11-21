import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { InformacoesIncorretas } from "../@types/errors/InformacoesIncorretas";

@Service("UsuarioController")
export class UsuarioController {
  constructor(
    @Inject("UsuarioService") private usuarioService: IUsuarioService
  ) {}

  async listar(request: Request, response: Response): Promise<void> {
    const usuarios = await this.usuarioService.listar();
    if (!usuarios) {
      response.status(204);
    }
    response.send(usuarios).status(200);
  }

  async buscar(request: Request, response: Response): Promise<void> {
    const usuario = await this.usuarioService.buscar(Number(request.params.id));
    if (!usuario) {
      response.status(204);
    }
    response.send(usuario).status(200);
  }

  async criar(request: Request, response: Response): Promise<void> {
    if (!request.body) {
      response.status(400);
      throw new InformacoesIncorretas();
    }
    const usuario = await this.usuarioService.criar(request.body);
    response.send(usuario).status(201);
  }

  async atualizar(request: Request, response: Response): Promise<void> {
    if (!request.body) {
      response.status(400);
      throw new InformacoesIncorretas();
    }
    const usuario = await this.usuarioService.atualizar(request.body);
    response.send(usuario).status(200);
  }

  async remover(request: Request, response: Response): Promise<void> {
    if (!request.params.id) {
      response.status(400);
      throw new InformacoesIncorretas();
    }
    await this.usuarioService.remover(Number(request.params.id));
    response.send().status(200);
  }
}
