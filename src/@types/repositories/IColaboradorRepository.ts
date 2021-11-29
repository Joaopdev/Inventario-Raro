import { Colaborador } from "models/ColaboradorEntity";

export interface IColaboradorRepository {
  save(colaborador: Colaborador): Promise<Colaborador>;
  findById(id: number): Promise<Colaborador>;
  findAll(): Promise<Colaborador[]>;
  findEquipamentoByColaborador(id: number): Promise<Colaborador>;
  remove(entities: Colaborador | Colaborador[]): Promise<Colaborador[]>;
}
