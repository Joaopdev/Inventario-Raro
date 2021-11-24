import { CriarTipoEquipamentoDto } from "../../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export function omitIdTipoEquipamento(
  tipoEquipamento: TipoEquipamento
): CriarTipoEquipamentoDto {
  const { descricao, modelo, quantidade, tipo } = tipoEquipamento;
  const {
    quantidadeCritica,
    tempoMedioConsumo,
    tempoMedioEnvio,
    tempoMedioReposicao,
  } = tipoEquipamento.parametro;
  const parametro = {
    quantidadeCritica,
    tempoMedioConsumo,
    tempoMedioEnvio,
    tempoMedioReposicao,
  };
  const tipoEquipamentoCriado = {
    tipo,
    modelo,
    quantidade,
    descricao,
    parametro,
  };

  return tipoEquipamentoCriado;
}
