import { Usuario } from "../../models/UsuarioEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";


export interface IUsuarioRepository {
  find(): Promise<Usuario[]>;
  findOne(id: number): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
  remove(entities: Usuario | Usuario[]): Promise<Usuario[]>;
  update(id: number, usuario: QueryDeepPartialEntity<Usuario>): Promise<UpdateResult>;
};
