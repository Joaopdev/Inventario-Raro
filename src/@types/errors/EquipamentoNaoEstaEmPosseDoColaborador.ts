import { BaseError } from "./BaseError";

export class EquipamentoNaoEstaEmPosseDoColaborador
  extends Error
  implements BaseError
{
  public name: string;
  constructor() {
    super("O colabroador não possui esse equipamento");
    this.name = "EquipamentoNaoEstaEmPosseDoColaborador";
  }
}
