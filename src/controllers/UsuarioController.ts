import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { InformacoesIncorretas } from "../@types/errors/InformacoesIncorretas";
import { DadosParaLogin } from "../@types/controllers/DadosParaLogin";
import RequestWithUserData from "../@types/controllers/RequestWithUserData";
import { EmailInvalido } from "../@types/errors/EmailInvalido";
import { RoleDeUsuarioInadequada } from "../@types/errors/RoleDeUsuarioInadequada";

@Service("UsuarioController")
export class UsuarioController {
  constructor(
    @Inject("UsuarioService") private usuarioService: IUsuarioService
  ) {}

  async autenticar(
    request: Request,
    response: Response
  ): Promise<Response<{ token: string } | string>> {
    const { email, senha } = request.body as DadosParaLogin;
    const token = await this.usuarioService.autenticar(email, senha);
    if (token) {
      return response.send({ token });
    }
    return response
      .status(422)
      .send("não foi possivel realizar a autenticacao");
  }

  async buscar(request: Request, response: Response): Promise<void> {
    const usuario = await this.usuarioService.buscar(Number(request.params.id));
    if (!usuario) {
      response.status(204);
    }
    response.send(usuario).status(200);
  }

  async buscarMeusDados(
    request: RequestWithUserData,
    response: Response
  ): Promise<void> {
    const { usuario: tokenPayload } = request;
    const id = tokenPayload.id;
    const eu = await this.usuarioService.buscar(id);
    response.send(eu).status(201);
  }

  async listar(request: Request, response: Response): Promise<void> {
    const usuarios = await this.usuarioService.listar();
    if (!usuarios) {
      response.status(204);
    }
    response.send(usuarios).status(200);
  }

  async criar(request: Request, response: Response): Promise<void> {
    try {
      if (!request.body) {
        response.status(400);
        throw new InformacoesIncorretas();
      }
      const usuario = await this.usuarioService.criar(request.body);
      response.send(usuario).status(201);
    } catch (error) {
      if (error instanceof EmailInvalido) {
        response.status(400).send({ error: error.message });
        return;
      }
      if (error instanceof RoleDeUsuarioInadequada) {
        response.status(400).send({ error: error.message });
        return;
      }
      if (error instanceof Error) {
        response.status(400).send();
        return;
      }
    }
  }

  async atualizar(request: Request, response: Response): Promise<void> {
    if (!request.body) {
      response.status(400);
      throw new InformacoesIncorretas();
    }
    const usuario = await this.usuarioService.atualizar(
      Number(request.params.id),
      request.body
    );
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
