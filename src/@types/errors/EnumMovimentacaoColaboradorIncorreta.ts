import { BaseError } from "./BaseError";

export class EnumMovimentacaoColaboradorIncorreta
  extends Error
  implements BaseError
{
  public name: string;
  constructor() {
    super("Tipo de movimentacao incorreto");
    this.name = "EnumMovimentacaoColaboradorIncorreta";
  }
}
