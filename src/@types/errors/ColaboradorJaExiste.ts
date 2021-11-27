import { BaseError } from "./BaseError";

export class ColaboradorJaExiste extends Error implements BaseError {
  public static CODE = "ER_DUP_ENTRY";
  public name: string;
  constructor() {
    super("Colaborador ja existe");
    this.name = "ColaboradorJaExiste";
  }
}
