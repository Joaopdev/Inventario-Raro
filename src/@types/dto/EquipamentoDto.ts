import { TipoEquipamentoDto } from "./TipoEquipamentoDto";

export type EquipamentoDto = {
  id: number;
  lote: number;
  descricao: string;
  numeroDeSerie: number;
  dataAquisicao: number;
  tipoEquipamento: TipoEquipamentoDto;
};

export type CriarEquipamentoDto = Omit<EquipamentoDto, "id">;
