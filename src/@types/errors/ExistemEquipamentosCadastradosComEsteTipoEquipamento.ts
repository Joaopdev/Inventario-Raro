import { BaseError } from "./BaseError";

export class ExitemEquipamentosCadastradosComEsteTipoEquipamento
  extends Error
  implements BaseError
{
  public name: string;
  constructor() {
    super("existem equipamentos cadastrados nesse tipo de equipamento");
    this.name = "ExistemEquipamentosCadastradosComEsteTipoEquipamento";
  }
}
