import { Operacao } from "../../@types/enums/Operacao";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoService {
  criarTipoEquipamento(
    token: string,
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<CriarTipoEquipamentoDto>;
  listarTipoEquipamento(): Promise<CriarTipoEquipamentoDto[]>;
  buscarTipoEquipamento(id: number): Promise<TipoEquipamento>;
  buscarTipoEquipamentoComEquipamentos(id: number): Promise<TipoEquipamento>;
  atualizarTipoEquipamento(
    id: number,
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<void>;
  removerTipoEquipamento(id: number): Promise<void>;
  atualizaQuantidadeTipoEquipamento(
    id: number,
    operacao: Operacao
  ): Promise<TipoEquipamento>;
}
