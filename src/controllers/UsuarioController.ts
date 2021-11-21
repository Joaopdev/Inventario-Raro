import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { UsuarioNaoExiste } from "../@types/errors/UsuarioNaoExiste";

@Service("UsuarioController")
export class UsuarioController {
  constructor(@Inject("UsuarioService") private usuarioService: IUsuarioService) {}

  async list(request: Request, response: Response): Promise<void> {
    const usuarios = await this.usuarioService.listar();
    if(!usuarios) {
      response.send("Usuários não encontrados").status(404);
    }
    response.send(usuarios).status(200);
  }

  async get(request: Request, response: Response): Promise<void> {
    const usuario = await this.usuarioService.buscar(Number(request.params.id));
    if(!usuario) {
      response.send("Usuario não encontrado").status(404);
    }
    response.send(usuario).status(200);
  }

  async create(request: Request, response: Response): Promise<void> {
    if(!request.body) {
      response.send("Informações incorretas e/ou incompletas").status(400);
    }
    const usuario = await this.usuarioService.criar(request.body);
    response.send(usuario).status(200);
  }

  async update(request: Request, response: Response): Promise<void> {
    if(!request.body) {
      response.send("Informações incorretas e/ou incompletas").status(400);
    }
    const usuario = await this.usuarioService.atualizar(request.body);
    response.send(usuario).status(200);
  }

  async remove(request: Request, response: Response): Promise<void> {
    if(!request.params.id) {
      response.send("Usuario não encontrado").status(400);
    }
    await this.usuarioService.remover(Number(request.params.id));
    response.send();
  }
}
