import { TipoEquipamentoDto } from "./TipoEquipamentoDto";

export type ParametroDto = {
  id: number;
  tempoMedioEnvio: number;
  tempoMedioConsumo: number;
  tempoMedioReposicao: number;
  quantidadeCritica: number;
  tipoEquipamento?: TipoEquipamentoDto;
};

export type AtualizarParametroDto = {
  tempoMedioEnvio?: number;
  tempoMedioConsumo?: number;
  tempoMedioReposicao?: number;
  quantidadeCritica?: number;
};

export type CriarParametroDto = Omit<ParametroDto, "id">;
