import {
  AlteraMovimentacaoDto,
  CriarMovimentacaoDto,
} from "../dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";
import { TipoMovimentacao } from "../../@types/enums/TipoMovimentacao";
import { Equipamento } from "../../models/EquipamentoEntity";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export interface IMovimentacaoService {
  listarPorTipoMovimentacao(
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Movimentacao[]>;
  buscar(id: number): Promise<Movimentacao>;
  buscarPeloEquipamento(id: number): Promise<Movimentacao | Movimentacao[]>;
  buscarPeloColaborador(id: number): Promise<Movimentacao | Movimentacao[]>;
  atualizar(
    id: number,
    movimentacaoAlterada: AlteraMovimentacaoDto
  ): Promise<void>;
  geraMovimentacaoEquipamento(
    usuarioId: number,
    equipamento: Equipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void>;
  geraMovimentacaoTipoEquipamento(
    usuarioId: number,
    tipoEquipamento: TipoEquipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void>;
  remover(id: number): Promise<void>;
}
