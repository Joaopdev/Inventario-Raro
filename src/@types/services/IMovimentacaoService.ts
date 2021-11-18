import { MovimentacaoDto } from "../dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";

export interface IMovimentacaoService {
  listar(): Promise<Movimentacao[]>;
  buscar(id: number): Promise<Movimentacao>;
  criar(movimentacaoDto: MovimentacaoDto): Promise<Movimentacao>;
};
