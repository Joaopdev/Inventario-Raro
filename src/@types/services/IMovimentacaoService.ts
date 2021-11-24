import {
  AlteraMovimentacaoDto,
  CriarMovimentacaoDto,
} from "../dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";
import { TipoMovimentacao } from "../../@types/enums/TipoMovimentacao";

export interface IMovimentacaoService {
  listar(): Promise<Movimentacao[]>;
  listarPorTipoMovimentacao(
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Movimentacao[]>;
  buscar(id: number): Promise<Movimentacao>;
  buscarPeloEquipamento(id: number): Promise<Movimentacao | Movimentacao[]>;
  buscarPeloColaborador(id: number): Promise<Movimentacao | Movimentacao[]>;
  criar(movimentacaoDto: CriarMovimentacaoDto): Promise<Movimentacao>;
  atualizar(
    id: number,
    movimentacaoAlterada: AlteraMovimentacaoDto
  ): Promise<void>;
  remover(id: number): Promise<void>;
}
