import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoService {
  criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<CriarTipoEquipamentoDto>;
  listarTipoEquipamento(): Promise<CriarTipoEquipamentoDto[]>;
  buscarTipoEquipamento(id: number): Promise<CriarTipoEquipamentoDto>;
  buscarTipoEquipamentoComEquipamentos(id: number): Promise<TipoEquipamento>;
  atualizarTipoEquipamento(
    id: number,
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<void>;
  removerTipoEquipamento(id: number): Promise<void>;
}
