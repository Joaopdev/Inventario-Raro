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
    equipamentoDto: AtualizarEquipamentoDto
  ): Promise<Equipamento>;
  buscarEquipamentoDoColaborador(idColaborador: number): Promise<Equipamento[]>;
}
