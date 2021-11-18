import { CriarParametroDto } from "../dto/ParametroDto";
import { Parametro } from "models/ParametroEntity";

export interface IParametroService {
  criarParametro(parametro: CriarParametroDto): Promise<Parametro>;
  listarParametro(): Promise<Parametro[]>;
}
