import { RetornoColaboradorEquipamentoDto } from "../../@types/dto/EquipamentoDto";
import { RetornoColaboradorTipoEquipamentoDto } from "../../@types/dto/TipoEquipamentoDto";
import { RetornoColaboradorEquipamentosCriadoDto } from "../../@types/dto/ColaboradorDto";
import { Colaborador } from "../../models/ColaboradorEntity";
import { Equipamento } from "../../models/EquipamentoEntity";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export const omitEquipamentosId = (
  colaborador: Colaborador
): RetornoColaboradorEquipamentosCriadoDto => {
  const { id, endereco, equipamentos, movimentacoes, ...colaboradorTratado } =
    colaborador;
  const novoColaborador: RetornoColaboradorEquipamentosCriadoDto = {
    ...colaboradorTratado,
    ...{ equipamentos: removeEquipamentoId(equipamentos) },
  };
  return novoColaborador;
};

const removeEquipamentoId = (
  equipamentos: Equipamento[]
): RetornoColaboradorEquipamentoDto[] => {
  const equipamentosTratados = equipamentos.map((equipamento) => {
    const { id, movimentacoes, tipoEquipamento, ...equipamentoTratado } =
      equipamento;
    const novoEquipamento: RetornoColaboradorEquipamentoDto = {
      ...equipamentoTratado,
      ...{ tipoEquipamento: removeTipoEquipamentoId(tipoEquipamento) },
    };
    return novoEquipamento;
  });

  return equipamentosTratados;
};

const removeTipoEquipamentoId = (
  tipoEquipamento: TipoEquipamento
): RetornoColaboradorTipoEquipamentoDto => {
  const {
    id,
    equipamentos,
    movimentacoes,
    parametro,
    ...tipoEquipamentoTratado
  } = tipoEquipamento;
  const novoTipoEquipamento: RetornoColaboradorTipoEquipamentoDto =
    tipoEquipamentoTratado;
  return novoTipoEquipamento;
};
