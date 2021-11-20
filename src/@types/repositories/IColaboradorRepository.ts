import { Colaborador } from "models/ColaboradorEntity";

export interface IColaboradorRepository {
  save(colaborador: Colaborador): Promise<Colaborador>;
  findById(id: number): Promise<Colaborador>;
  findAll(): Promise<Colaborador[]>;
  remove(entities0: Colaborador | Colaborador[]): Promise<Colaborador[]>;
}
