import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../@types/dto/TipoEquipamentoDto";
import { parametroFactory } from "./parametroFactory";

export function tipoEquipamentoFactory(
  tipoEquipamentoDto: CriarTipoEquipamentoDto
): TipoEquipamento {
  const tipoEquipamento = new TipoEquipamento();
  tipoEquipamento.tipo = tipoEquipamentoDto.tipo;
  tipoEquipamento.modelo = tipoEquipamentoDto.modelo;
  tipoEquipamento.quantidade = tipoEquipamentoDto.quantidade;
  tipoEquipamento.descricao = tipoEquipamentoDto.descricao;
  tipoEquipamento.parametro = parametroFactory(tipoEquipamentoDto.parametro);
  return tipoEquipamento;
}
