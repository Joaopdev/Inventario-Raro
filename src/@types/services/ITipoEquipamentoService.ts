import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoService {
  criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<TipoEquipamento>;
  listarTipoEquipamento(): Promise<TipoEquipamento[]>;
  buscarTipoEquipamento(id: number): Promise<TipoEquipamento>;
  atualizarTipoEquipamento(
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<TipoEquipamento>;
  removerTipoEquipamento(id: number): Promise<void>;
}
