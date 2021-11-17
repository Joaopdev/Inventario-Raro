import { Colaborador } from "models/ColaboradorEntity";

export interface IColaboradorRepository {
  save(colaborador: Colaborador): Promise<Colaborador>;
  findByEmail(email: string): Promise<Colaborador>;
  findById(id): Promise<Colaborador>;
  findAll(): Promise<Colaborador[]>;
  remove(entities0: Colaborador | Colaborador[]): Promise<Colaborador[]>;
}
