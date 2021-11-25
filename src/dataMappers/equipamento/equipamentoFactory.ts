import { Equipamento } from "../../models/EquipamentoEntity";
import { CriarEquipamentoDto } from "../../@types/dto/EquipamentoDto";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export function equipamentoFactory(
  equipamentoDto: CriarEquipamentoDto
): Equipamento {
  const equipamento = new Equipamento();
  equipamento.lote = equipamentoDto.lote;
  equipamento.movimentacoes = [];
  equipamento.descricao = equipamentoDto.descricao;
  equipamento.dataAquisicao = new Date(equipamentoDto.dataAquisicao);
  equipamento.numeroDeSerie = equipamentoDto.numeroDeSerie;
  const tipoEquipamento = new TipoEquipamento();
  tipoEquipamento.id = equipamentoDto.tipoEquipamentoId;
  equipamento.tipoEquipamento = tipoEquipamento;
  return equipamento;
}
