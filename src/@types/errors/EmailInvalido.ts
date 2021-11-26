import { BaseError } from "./BaseError";

export class EmailInvalido extends Error implements BaseError {
  public name: string;
  constructor() {
    super("email inválido");
    this.name = "EmailInvalido";
  }
}
