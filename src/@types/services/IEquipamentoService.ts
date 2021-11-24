import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
} from "../dto/EquipamentoDto";
import { Equipamento } from "../../models/EquipamentoEntity";

export interface IEquipamentoService {
  criarEquipamento(equipamentoDto: CriarEquipamentoDto): Promise<Equipamento>;
  listarEquipamentos(): Promise<Equipamento[]>;
  removerEquipamento(id: number): Promise<void>;
  atualizarEquipamento(
    id: number,
    equipamentoDto: AtualizarEquipamentoDto
  ): Promise<Equipamento>;
}
