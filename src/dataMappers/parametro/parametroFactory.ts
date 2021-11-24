import { CriarParametroDto } from "../../@types/dto/ParametroDto";
import { Parametro } from "../../models/ParametroEntity";

export function parametroFactory(parametroDto: CriarParametroDto): Parametro {
  const parametro = new Parametro();
  parametro.quantidadeCritica = parametroDto.quantidadeCritica;
  parametro.tempoMedioConsumo = parametroDto.tempoMedioConsumo;
  parametro.tempoMedioEnvio = parametroDto.tempoMedioEnvio;
  parametro.tempoMedioReposicao = parametroDto.tempoMedioReposicao;
  return parametro;
}
