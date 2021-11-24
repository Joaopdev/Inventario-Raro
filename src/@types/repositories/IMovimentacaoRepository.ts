import { TipoMovimentacao } from "../../@types/enums/TipoMovimentacao";
import { Movimentacao } from "../../models/MovimentacaoEntity";

export interface IMovimentacaoRepository {
  findAll(): Promise<Movimentacao[]>;
  findByTipoMovimentacao(
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Movimentacao[]>;
  findByColaborador(
    colaboradorId: number
  ): Promise<Movimentacao | Movimentacao[]>;
  findByEquipamento(
    equipamentoId: number
  ): Promise<Movimentacao | Movimentacao[]>;
  findOneMovimentacao(id: number): Promise<Movimentacao>;
  save(movimentacao: Movimentacao): Promise<Movimentacao>;
  remove(movimentacao: Movimentacao | Movimentacao[]): Promise<Movimentacao[]>;
}
