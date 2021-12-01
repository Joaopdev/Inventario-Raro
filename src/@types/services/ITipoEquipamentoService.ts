import { Operacao } from "../../@types/enums/Operacao";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
  RetornoCriarTipoEquipamentoDto,
} from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoService {
  criarTipoEquipamento(
    token: string,
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<RetornoCriarTipoEquipamentoDto>;
  listarTipoEquipamento(): Promise<RetornoCriarTipoEquipamentoDto[]>;
  buscarTipoEquipamento(id: number): Promise<TipoEquipamento>;
  buscarTipoEquipamentoComEquipamentos(id: number): Promise<TipoEquipamento>;
  atualizarTipoEquipamento(
    id: number,
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<void>;
  inativarTipoEquipamento(authorization: string, id: number): Promise<void>;
  atualizaQuantidadeTipoEquipamento(
    id: number,
    operacao: Operacao
  ): Promise<TipoEquipamento>;
}
