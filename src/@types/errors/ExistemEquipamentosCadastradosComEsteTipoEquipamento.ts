import { BaseError } from "./BaseError";

export class ExitemEquipamentosCadastradosComEsteTipoEquipamento
  extends Error
  implements BaseError
{
  public static CODE = "ER_ROW_IS_REFERENCED_2";
  public name: string;
  constructor() {
    super("existem equipamentos cadastrados nesse tipo de equipamento");
    this.name = "ExistemEquipamentosCadastradosComEsteTipoEquipamento";
  }
}
