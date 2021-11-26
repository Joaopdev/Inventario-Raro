import { validarEmail } from "../utils/validarEmail";
import { UsuarioDto } from "../@types/dto/UsuarioDto";
import { Usuario } from "../models/UsuarioEntity";
import { getHashSenha } from "../utils/hashSenha";
import { EmailInvalido } from "../@types/errors/EmailInvalido";

export const usuarioFactory = (novoUsuario: UsuarioDto): Usuario => {
  if (!validarEmail(novoUsuario.email)) {
    throw new EmailInvalido();
  }
  const usuario = new Usuario();
  usuario.nome = novoUsuario.nome;
  usuario.email = novoUsuario.email;
  usuario.hashSenha = getHashSenha(novoUsuario.senha);
  usuario.role = novoUsuario.role;
  return usuario;
};
