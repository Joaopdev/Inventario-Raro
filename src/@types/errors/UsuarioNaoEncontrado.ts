import { BaseError } from "./BaseError";

export class UsuarioNaoEncontrado extends Error implements BaseError {
  public name: string;
  constructor() {
    super("Usuário não encontrado no banco de dados");
    this.name = "UsuarioNaoEncontrado";
  }
}
