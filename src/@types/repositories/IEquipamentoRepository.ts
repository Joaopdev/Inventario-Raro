import { Equipamento } from "../../models/EquipamentoEntity";

export interface IEquipamentoRepository {
  save(equipamento: Equipamento): Promise<Equipamento>;
  find(): Promise<Equipamento[]>;
  findAllEquipamentos(): Promise<Equipamento[]>;
  remove(entities: Equipamento | Equipamento[]): Promise<Equipamento[]>;
  findOne(id: number): Promise<Equipamento>;
  findEquipamento(id: number): Promise<Equipamento>;
  findEquipamentoComParametro(id: number): Promise<Equipamento>;
}
