import {
  AlteraMovimentacaoDto,
  CriarMovimentacaoDto,
} from "../dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";
import { TipoMovimentacao } from "../../@types/enums/TipoMovimentacao";
import { Equipamento } from "../../models/EquipamentoEntity";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { Colaborador } from "../../models/ColaboradorEntity";

export interface IMovimentacaoService {
  listarPorTipoMovimentacao(
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Movimentacao[]>;
  buscar(id: number): Promise<Movimentacao>;
  buscarPeloEquipamento(id: number): Promise<Movimentacao | Movimentacao[]>;
  buscarPeloColaborador(id: number): Promise<Movimentacao | Movimentacao[]>;
  criar(
    authorization: string,
    movimentacaoDto: CriarMovimentacaoDto
  ): Promise<Movimentacao>;
  atualizar(
    id: number,
    movimentacaoAlterada: AlteraMovimentacaoDto
  ): Promise<void>;
  criarMovimentacaoEnvio(
    usuarioId: number,
    colaboradorComEquipamento: Colaborador,
    novaMovimentacao: CriarMovimentacaoDto
  ): Promise<void>;
  criarMovimentacaoDevolucao(
    usuarioId: number,
    colaboradorComEquipamento: Colaborador,
    novaMovimentacao: CriarMovimentacaoDto
  ): void;
  criarMovimentacaoEquipamento(
    usuarioId: number,
    equipamento: Equipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void>;
  criarMovimentacaoTipoEquipamento(
    usuarioId: number,
    tipoEquipamento: TipoEquipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void>;
  remover(id: number): Promise<void>;
}
