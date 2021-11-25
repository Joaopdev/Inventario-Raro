import { Colaborador } from "models/ColaboradorEntity";
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
    equipamentoId: number
  ): Promise<void>;
  remover(id: number): Promise<void>;
  buscarEquipamentoDoColaborador(
    id: number
  ): Promise<RetornoColaboradorEquipamentosCriadoDto>;
}
