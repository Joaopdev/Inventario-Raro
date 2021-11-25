import { Inject, Service } from "typedi";
import { UsuarioDto, AtualizarUsuarioDto } from "../@types/dto/UsuarioDto";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/UsuarioEntity";
import { usuarioFactory } from "../dataMappers/usuarioFactory";

@Service("UsuarioService")
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async buscar(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }
    return usuario;
  }

  async criar(usuarioDto: UsuarioDto): Promise<Usuario> {
    const usuario = usuarioFactory(usuarioDto);
    const resultado = await this.usuarioRepository.save(usuario);
    return resultado;
  }

  async atualizar(usuarioAtualizadoDto: AtualizarUsuarioDto): Promise<void> {
    const usuario = await this.buscar(usuarioAtualizadoDto.id);
    const usuarioAtualizado = { ...usuario, ...usuarioAtualizadoDto };
    await this.usuarioRepository.save(usuarioAtualizado);
  }

  async remover(id: number): Promise<void> {
    const usuario = await this.buscar(id);
    await this.usuarioRepository.remove(usuario);
  }
}
