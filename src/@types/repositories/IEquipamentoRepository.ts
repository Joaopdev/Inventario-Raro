import { CriarEquipamentoDto } from "../dto/EquipamentoDto";
import { Equipamento } from "models/EquipamentoEntity";

export interface IEquipamentoRepository {
  save(equipamento: CriarEquipamentoDto): Promise<Equipamento>;
  find(): Promise<Equipamento[]>;
}
