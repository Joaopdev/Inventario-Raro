import { Equipamento } from "models/EquipamentoEntity";

export interface IEquipamentoRepository {
  save(equipamento: Equipamento): Promise<Equipamento>;
  find(): Promise<Equipamento[]>;
}
