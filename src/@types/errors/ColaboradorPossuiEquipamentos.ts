import { BaseError } from "./BaseError";

export class ColaboradorPossuiEquipamentos extends Error implements BaseError {
  public name: string;
  constructor() {
    super("O colaborador possui equipamentos cadastrados, efetue a devolucao");
    this.name = "ColaboradorPossuiEquipamentos";
  }
}
