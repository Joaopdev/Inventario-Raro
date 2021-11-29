import { RetornoEquipamentoDto } from "../../@types/dto/EquipamentoDto";
import { Equipamento } from "../../models/EquipamentoEntity";

export function omitTipoEquipamentoDoEquipamento(
  equipamento: Equipamento
): RetornoEquipamentoDto {
  const { id, lote, descricao, numeroDeSerie, dataAquisicao } = equipamento;
  const equipamentoCriado = {
    id,
    lote,
    descricao,
    numeroDeSerie,
    dataAquisicao,
  };

  return equipamentoCriado;
}
