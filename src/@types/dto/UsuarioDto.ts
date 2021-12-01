import { Role } from "../enums/Role";

export type UsuarioDto = {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  role?: Role;
};

export type AtualizarUsuarioDto = {
  nome?: string;
  email?: string;
  senha?: string;
  role?: Role;
};

export type CriarUsuarioDto = Omit<UsuarioDto, "id">;
export type AutenticarUsuarioDTO = Pick<UsuarioDto, "email" | "senha">;
export type UsuarioCriadoDTO = Omit<UsuarioDto, "senha">;
