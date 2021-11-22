import { AtualizarParametroDto, CriarParametroDto } from "../dto/ParametroDto";
import { Parametro } from "../../models/ParametroEntity";

export interface IParametroService {
  criarParametro(parametroDto: CriarParametroDto): Promise<Parametro>;
  listarParametro(): Promise<Parametro[]>;
  atualizarParametro(
    id: number,
    parametroDto: AtualizarParametroDto
  ): Promise<Parametro>;
  removerParametro(id: number): Promise<void>;
}
