import { BaseError } from "./BaseError";

export class TipoEquipamentoNaoExiste extends Error implements BaseError {
  public name: string;
  constructor() {
    super("tipo equipamento não existe");
    this.name = "TipoEquipamentoNaoExiste";
  }
}
