import { TipoEquipamentoDto } from "./TipoEquipamentoDto";

export type EquipamentoDto = {
  id: number;
  lote: string;
  descricao?: string;
  numeroDeSerie: string;
  dataAquisicao: Date;
  tipoEquipamento: TipoEquipamentoDto;
};

export type AtualizarEquipamentoDto = {
  lote?: string;
  descricao?: string;
  numeroDeSerie?: string;
  dataAquisicao?: Date;
};

export type CriarEquipamentoDto = Omit<
  EquipamentoDto,
  "id" | "tipoEquipamento"
> & {
  tipoEquipamentoId: number;
};

export type RetornoEquipamentoDto = Omit<
  EquipamentoDto,
  "id" | "tipoEquipamento"
>;
