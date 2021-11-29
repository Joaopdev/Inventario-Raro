import { BaseError } from "./BaseError";

export class ColaboradorNaoExiste extends Error implements BaseError {
  public name: string;
  constructor() {
    super("colaborador não encontrado no banco de dados");
    this.name = "ColaboradorNaoExiste";
  }
}
