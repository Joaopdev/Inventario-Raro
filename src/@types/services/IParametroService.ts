import { CriarParametroDto } from "../dto/ParametroDto";
import { Parametro } from "models/ParametroEntity";

export interface IParametroService {
  criarParametro(parametroDto: CriarParametroDto): Promise<Parametro>;
  listarParametro(): Promise<Parametro[]>;
}
