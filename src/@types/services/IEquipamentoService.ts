import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
  RetornoEquipamentoDto,
} from "../dto/EquipamentoDto";
export interface IEquipamentoService {
  criarEquipamento(
    equipamentoDto: CriarEquipamentoDto
  ): Promise<RetornoEquipamentoDto>;
  listarEquipamentos(): Promise<RetornoEquipamentoDto[]>;
  removerEquipamento(id: number): Promise<void>;
  atualizarEquipamento(
    id: number,
    equipamentoDto: AtualizarEquipamentoDto
  ): Promise<void>;
  buscarEquipamento(id: number): Promise<RetornoEquipamentoDto>;
}
