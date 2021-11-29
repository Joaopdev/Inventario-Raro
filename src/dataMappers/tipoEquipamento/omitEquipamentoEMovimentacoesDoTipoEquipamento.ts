import { RetornoCriarTipoEquipamentoDto } from "../../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export function omitEquipamentoEMovimentacoesDoTipoEquipamento(
  tipoEquipamento: TipoEquipamento
): RetornoCriarTipoEquipamentoDto {
  const { id, descricao, modelo, quantidade, tipo } = tipoEquipamento;
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
    id,
    tipo,
    modelo,
    quantidade,
    descricao,
    parametro,
  };

  return tipoEquipamentoCriado;
}
