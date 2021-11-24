import { Equipamento } from "../../models/EquipamentoEntity";
import { AtualizarEquipamentoDto } from "../../@types/dto/EquipamentoDto";

export function atualizaEquipamento(
  equipamento: Equipamento,
  eqipamentoDto: AtualizarEquipamentoDto
): Equipamento {
  const equipamentoAtualizado = { ...equipamento, ...eqipamentoDto };
  return equipamentoAtualizado;
}
