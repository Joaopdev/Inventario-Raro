import { Parametro } from "models/ParametroEntity";
import { CriarParametroDto } from "../dto/ParametroDto";

export interface IParametroRepository {
  save(parametro: CriarParametroDto): Promise<Parametro>;
  find(): Promise<Parametro[]>;
}
