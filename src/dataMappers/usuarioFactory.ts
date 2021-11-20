import { UsuarioDto } from "../@types/dto/UsuarioDto";
import { Usuario } from "../models/UsuarioEntity";
import { getHashSenha } from "../utils/hashSenha"

export const usuarioFactory = (novoUsuario: UsuarioDto): Usuario => {
  const usuario = new Usuario();
  usuario.nome = novoUsuario.nome;
  usuario.email = novoUsuario.email;
  usuario.hashSenha = getHashSenha(novoUsuario.senha);
  usuario.role = novoUsuario.role;
  return usuario;
};
