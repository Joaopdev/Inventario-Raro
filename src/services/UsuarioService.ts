import { Inject, Service } from "typedi";
import { UsuarioDto, AtualizarUsuarioDto } from "../@types/dto/UsuarioDto";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/UsuarioEntity";
import { usuarioFactory } from "../dataMappers/usuarioFactory";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { getHashSenha } from "../utils/hashSenha";
import { sign } from "jsonwebtoken";
@Service("UsuarioService")
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }
  async autenticar(
    usuarioEmail: string,
    usuarioSenha: string
  ): Promise<string> {
    const usuario = await this.usuarioRepository.findByEmail(usuarioEmail);
    if (usuario.hashSenha === getHashSenha(usuarioSenha)) {
      const { id, nome, email, role } = usuario;
      const payload: TokenPayload = {
        role,
        nome,
        id,
        email,
      };

      return sign(payload, process.env.AUTH_SECRET);
    }
    throw new Error("usuario ou senha incorretos");
  }

  async buscar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    return usuario;
  }

  async criar(usuarioDto: UsuarioDto): Promise<TokenPayload> {
    const usuario = usuarioFactory(usuarioDto);
    const resultado = await this.usuarioRepository.save(usuario);
    const { hashSenha, ...resultadoTratado } = resultado;
    return resultadoTratado;
  }

  async atualizar(
    id: number,
    usuarioAtualizadoDto: AtualizarUsuarioDto
  ): Promise<void> {
    const usuario = await this.usuarioRepository.findOne(id);
    const usuarioAtualizado = { ...usuario, ...usuarioAtualizadoDto };
    await this.usuarioRepository.save(usuarioAtualizado);
  }

  async remover(id: number): Promise<void> {
    const usuario = await this.buscar(id);
    await this.usuarioRepository.remove(usuario);
  }
}
