import { BaseError } from "./BaseError";

export class InformacoesIncorretas extends Error implements BaseError {
  public name: string;
  constructor() {
    super("Informações incorretas e/ou incompletas");
    this.name = "InformacoesIncorretas";
  }
}
