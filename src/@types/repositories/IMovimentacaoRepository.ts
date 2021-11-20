import { Movimentacao } from "../../models/MovimentacaoEntity";

export interface IMovimentacaoRepository {
  find(): Promise<Movimentacao[]>
  findOne(id: number): Promise<Movimentacao>
  save(movimentacao: Movimentacao): Promise<Movimentacao>
}
