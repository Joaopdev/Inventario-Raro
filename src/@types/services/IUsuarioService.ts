import { UsuarioDto, AtualizarUsuarioDto } from "../dto/UsuarioDto";
import { Usuario } from "../../models/UsuarioEntity";
import { TokenPayload } from "../../@types/controllers/TokenPayload";

export interface IUsuarioService {
  listar(): Promise<Usuario[]>;
  buscar(id: number): Promise<Usuario>;
  criar(usuarioDto: UsuarioDto): Promise<TokenPayload>;
  autenticar(usuarioEmail: string, usuarioSenha: string): Promise<string>;
  atualizar(
    id: number,
    usuarioAtualizadoDto: AtualizarUsuarioDto
  ): Promise<void>;
  remover(id: number): Promise<void>;
}
