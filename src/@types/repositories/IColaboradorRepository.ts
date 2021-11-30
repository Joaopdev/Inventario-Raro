import { Colaborador } from "models/ColaboradorEntity";

export interface IColaboradorRepository {
  save(colaborador: Colaborador): Promise<Colaborador>;
  findById(id: number): Promise<Colaborador>;
  findAll(): Promise<Colaborador[]>;
  findColaboradorCompleto(id: number): Promise<Colaborador>;
  findColaboradorComEquipamento(id: number): Promise<Colaborador>;
  remove(entities: Colaborador | Colaborador[]): Promise<Colaborador[]>;
}
