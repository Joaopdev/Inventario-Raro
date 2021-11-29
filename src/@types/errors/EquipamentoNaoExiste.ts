import { BaseError } from "./BaseError";

export class EquipamentoNaoExiste extends Error implements BaseError {
  public name: string;
  constructor() {
    super("equipamento não existe");
    this.name = "EquipamentoNaoExiste";
  }
}
