import { BaseError } from "./BaseError";

export class TipoEquipamentoJaExiste extends Error implements BaseError {
  public static CODE = "ER_DUP_ENTRY";
  public name: string;
  constructor() {
    super("Tipo Equipamento já existe");
    this.name = "TipoEquipamentoJaExiste";
  }
}
