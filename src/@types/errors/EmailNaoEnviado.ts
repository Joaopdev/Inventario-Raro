import { BaseError } from "./BaseError";

export class EmailNaoEnviado extends Error implements BaseError {
  public name: string;
  constructor() {
    super("O email não pode ser enviado.");
    this.name = "EmailNaoEnviado";
  }
}