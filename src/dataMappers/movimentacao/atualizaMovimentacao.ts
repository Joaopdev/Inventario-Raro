import { AlteraMovimentacaoDto } from "../../@types/dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";

export const atualizaMovimentacao = (
  movimentacao: Movimentacao,
  alteraMovimentacao: AlteraMovimentacaoDto
): Movimentacao => {
  movimentacao.tipoMovimentacao = alteraMovimentacao.tipoMovimentacao
    ? alteraMovimentacao.tipoMovimentacao
    : movimentacao.tipoMovimentacao;
  movimentacao.dataMovimentacao = alteraMovimentacao.dataMovimentacao
    ? new Date(alteraMovimentacao.dataMovimentacao)
    : movimentacao.dataMovimentacao;
  movimentacao.dataEntrega = alteraMovimentacao.dataEntrega
    ? new Date(alteraMovimentacao.dataEntrega)
    : movimentacao.dataEntrega;
  movimentacao.descricao = alteraMovimentacao.descricao
    ? alteraMovimentacao.descricao
    : movimentacao.descricao;

  return movimentacao;
};
