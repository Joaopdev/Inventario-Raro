import { BaseError } from "./BaseError";

export class RoleDeUsuarioInadequada extends Error implements BaseError {
  public name: string;
  constructor() {
    super("Role inserida nao é compativel com o usuario");
    this.name = "RoleDeUsuarioInadequada";
  }
}
