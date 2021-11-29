import { Parametro } from "../../models/ParametroEntity";

export interface IParametroRepository {
  save(parametro: Parametro): Promise<Parametro>;
  find(): Promise<Parametro[]>;
  findOne(id: number): Promise<Parametro>;
  remove(entities: Parametro | Parametro[]): Promise<Parametro[]>;
}
