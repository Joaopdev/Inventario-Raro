import { validarEmail } from "../utils/validarEmail";
import { UsuarioDto } from "../@types/dto/UsuarioDto";
import { Usuario } from "../models/UsuarioEntity";
import { getHashSenha } from "../utils/hashSenha";
import { EmailInvalido } from "../@types/errors/EmailInvalido";
import { Role } from "../@types/enums/Role";
import { RoleDeUsuarioInadequada } from "../@types/errors/RoleDeUsuarioInadequada";

export const usuarioFactory = (novoUsuario: UsuarioDto): Usuario => {
  if (!validarEmail(novoUsuario.email)) {
    throw new EmailInvalido();
  }
  const usuario = new Usuario();
  usuario.nome = novoUsuario.nome;
  usuario.email = novoUsuario.email;
  usuario.hashSenha = getHashSenha(novoUsuario.senha);
  verificaSeTemRole(usuario, novoUsuario);
  return usuario;
};

const verificaSeTemRole = (usuario: Usuario, novoUsuario: UsuarioDto): void => {
  if (novoUsuario.role) {
    if (novoUsuario.role === Role.Admin || novoUsuario.role === Role.User) {
      usuario.role = novoUsuario.role;
    } else {
      throw new RoleDeUsuarioInadequada();
    }
  }
};
