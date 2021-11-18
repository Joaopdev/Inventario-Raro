import { CriarEquipamentoDto } from "../dto/EquipamentoDto";
import { Equipamento } from "models/EquipamentoEntity";

export interface IEquipamentoRepository {
  save(equipamentoDto: CriarEquipamentoDto): Promise<Equipamento>;
  find(): Promise<Equipamento[]>;
}
