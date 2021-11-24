import { TipoMovimentacao } from "../enums/TipoMovimentacao";

export type MovimentacaoDto = {
  id: number;
  tipoMovimentacao: TipoMovimentacao;
  dataMovimentacao: Date;
  dataInicio: Date;
  dataEntrega?: Date;
  descricao?: string;
};

export type CriarMovimentacaoDto = Omit<MovimentacaoDto, "id">;
