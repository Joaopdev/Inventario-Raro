import {
  AlteraMovimentacaoDto,
  CriarMovimentacaoDto,
} from "../dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";
import { TipoMovimentacao } from "../../@types/enums/TipoMovimentacao";
import { Equipamento } from "../../models/EquipamentoEntity";

export interface IMovimentacaoService {
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
  geraMovimentacaoEquipamento(
    usuarioId: number,
    equipamento: Equipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void>;
  remover(id: number): Promise<void>;
}
