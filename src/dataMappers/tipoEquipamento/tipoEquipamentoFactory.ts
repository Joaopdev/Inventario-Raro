import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../../@types/dto/TipoEquipamentoDto";
import { parametroFactory } from "../../dataMappers/parametro/parametroFactory";

export function tipoEquipamentoFactory(
  tipoEquipamentoDto: CriarTipoEquipamentoDto
): TipoEquipamento {
  const tipoEquipamento = new TipoEquipamento();
  tipoEquipamento.tipo = tipoEquipamentoDto.tipo;
  tipoEquipamento.modelo = tipoEquipamentoDto.modelo;
  tipoEquipamento.descricao = tipoEquipamentoDto.descricao;
  tipoEquipamento.movimentacoes = [];
  tipoEquipamento.parametro = parametroFactory(tipoEquipamentoDto.parametro);
  return tipoEquipamento;
}
