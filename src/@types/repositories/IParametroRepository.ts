import { Parametro } from "../../models/ParametroEntity";
import { CriarParametroDto } from "../dto/ParametroDto";

export interface IParametroRepository {
  save(parametro: Parametro): Promise<Parametro>;
  find(): Promise<Parametro[]>;
}
