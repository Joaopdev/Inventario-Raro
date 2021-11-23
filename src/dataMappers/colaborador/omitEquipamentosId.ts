import { RetornoEquipamentoCriadoDto } from "../../@types/dto/EquipamentoDto";
import { RetornoTipoEquipamentoCriadoDto } from "../../@types/dto/TipoEquipamentoDto";
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
): RetornoEquipamentoCriadoDto[] => {
  const equipamentosTratados = equipamentos.map((equipamento) => {
    const { id, movimentacoes, tipoEquipamento, ...equipamentoTratado } =
      equipamento;
    const novoEquipamento: RetornoEquipamentoCriadoDto = {
      ...equipamentoTratado,
      ...{ tipoEquipamento: removeTipoEquipamentoId(tipoEquipamento) },
    };
    return novoEquipamento;
  });

  return equipamentosTratados;
};

const removeTipoEquipamentoId = (
  tipoEquipamento: TipoEquipamento
): RetornoTipoEquipamentoCriadoDto => {
  const {
    id,
    equipamentos,
    movimentacoes,
    parametro,
    ...tipoEquipamentoTratado
  } = tipoEquipamento;
  const novoTipoEquipamento: RetornoTipoEquipamentoCriadoDto =
    tipoEquipamentoTratado;
  return novoTipoEquipamento;
};
