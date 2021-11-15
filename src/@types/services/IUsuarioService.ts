import { UsuarioDto } from "../dto/UsuarioDto";
import { Usuario } from "../../models/UsuarioEntity";

export interface IUsuarioService {
  listar(): Promise<Usuario[]>;
  buscar(id: number): Promise<Usuario>;
  criar(usuarioDto: UsuarioDto): Promise<Usuario>;
  atualizar(id: number, usuarioDto: UsuarioDto): Promise<void>;
  remover(id: number): Promise<void>;
}
