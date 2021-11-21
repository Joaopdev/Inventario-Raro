import { BaseError } from "./BaseError";

export class UsuarioNaoExiste extends Error implements BaseError {
  public name: string;
  constructor() {
    super("Usuário não encontrado no banco de dados");
    this.name = "ColaboradorNaoExiste";
  }
}
