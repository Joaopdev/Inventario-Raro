import { RetornoEquipamentoDto } from "../../@types/dto/EquipamentoDto";
import { Equipamento } from "../../models/EquipamentoEntity";

export function omitTipoEquipamentoEIdEquipamento(
  equipamento: Equipamento
): RetornoEquipamentoDto {
  const { lote, descricao, numeroDeSerie, dataAquisicao } = equipamento;
  const equipamentoCriado = {
    lote,
    descricao,
    numeroDeSerie,
    dataAquisicao,
  };

  return equipamentoCriado;
}
