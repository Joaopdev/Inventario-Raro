import { BaseError } from "./BaseError";

export class EquipamentoJaExiste extends Error implements BaseError {
  public static CODE = "ER_DUP_ENTRY";
  public name: string;
  constructor() {
    super("Equipamento já existe");
    this.name = "EquipamentoJaExiste";
  }
}
