import { AtualizarTipoEquipamentoDto } from "../../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export function atualizaTipoEquipamento(
  tipoEquipamento: TipoEquipamento,
  tipoEquipamentoDto: AtualizarTipoEquipamentoDto
): TipoEquipamento {
  const { descricao, modelo, quantidade, tipo } = {
    ...tipoEquipamentoDto,
  };

  const tipoEquipamentoAtualizadoDto = {
    descricao,
    modelo,
    quantidade,
    tipo,
  };

  const tipoEquipamentoAtualizado = {
    ...tipoEquipamento,
    ...tipoEquipamentoAtualizadoDto,
  };

  if (tipoEquipamentoDto.parametro) {
    tipoEquipamentoAtualizado.parametro = {
      ...tipoEquipamento.parametro,
      ...tipoEquipamentoDto.parametro,
    };
  }

  return tipoEquipamentoAtualizado;
}
