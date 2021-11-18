import { UsuarioDto } from "../dto/UsuarioDto";
import { Usuario } from "../../models/UsuarioEntity";

export interface IUsuarioRepository {
  find(): Promise<Usuario[]>;
  findOne(id: number): Promise<Usuario>;
  save(usuarioDto: UsuarioDto): Promise<Usuario>;
  remove(entities: Usuario | Usuario[]): Promise<Usuario[]>;
};
