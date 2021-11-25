import { TipoMovimentacao } from "../enums/TipoMovimentacao";

export type MovimentacaoDto = {
  id: number;
  tipoMovimentacao: TipoMovimentacao;
  dataMovimentacao: Date;
  dataEntrega?: Date;
  descricao?: string;
};

export type AlteraMovimentacaoDto = {
  tipoMovimentacao?: TipoMovimentacao;
  dataMovimentacao?: string;
  descricao?: string;
  dataEntrega?: string;
};

export type CriarMovimentacaoDto = {
  tipoMovimentacao: TipoMovimentacao;
  dataEntrega?: Date;
  descricao?: string;
  colaboradorId: number;
  equipamento: { id: number; tipoEquipamentoId: number };
};
