import { TipoMovimentacao } from "../../@types/enums/TipoMovimentacao";
import { Colaborador } from "models/ColaboradorEntity";
import { CriarMovimentacaoDto } from "../../@types/dto/MovimentacaoDto";
import { Equipamento } from "../../models/EquipamentoEntity";
import {
  AlterarColaboradorDto,
  ColaboradorDto,
  RetornoColaboradorCriadoDto,
  RetornoColaboradorEquipamentosCriadoDto,
} from "../dto/ColaboradorDto";

export interface IColaboradorService {
  listar(): Promise<RetornoColaboradorCriadoDto[]>;
  buscar(id: number): Promise<RetornoColaboradorCriadoDto>;
  criar(colaboradorDto: ColaboradorDto): Promise<RetornoColaboradorCriadoDto>;
  atualizar(
    id: number,
    colaboradorDtoAtualizado: AlterarColaboradorDto
  ): Promise<void>;
  atualizaEquipamentoDoColaborador(
    colaboradorId: number,
    equipamentoId: number,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Equipamento>;
  geraMovimentacaoColaborador(
    authorization: string,
    novaMovimentacao: CriarMovimentacaoDto
  ): Promise<void>;
  remover(id: number): Promise<void>;
  buscarEquipamentoDoColaborador(
    id: number
  ): Promise<RetornoColaboradorEquipamentosCriadoDto>;
}
