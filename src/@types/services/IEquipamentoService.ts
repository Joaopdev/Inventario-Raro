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
  buscarEquipamentoDoColaborador(idColaborador: number): Promise<Equipamento[]>;
  buscarEquipamento(id: number): Promise<Equipamento>;
}
