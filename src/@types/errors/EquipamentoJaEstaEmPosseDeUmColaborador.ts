import { BaseError } from "./BaseError";

export class EquipamentoJaEstaEmPosseDeUmColaborador
  extends Error
  implements BaseError
{
  public name: string;
  constructor() {
    super("Equipamento já esta em posse de um colaborador");
    this.name = "EquipamentoJaEstaEmPosseDeUmColaborador";
  }
}
