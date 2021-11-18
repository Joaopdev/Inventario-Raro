import { Parametro } from "models/ParametroEntity";
import { CriarParametroDto } from "../dto/ParametroDto";

export interface IParametroRepository {
  save(parametroDto: CriarParametroDto): Promise<Parametro>;
  find(): Promise<Parametro[]>;
}
