import { Inject, Service } from "typedi";
import { UsuarioDto } from "../@types/dto/UsuarioDto";
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
    return await this.usuarioRepository.find()
  }

  async buscar(id: number): Promise<Usuario> {
    return await this.usuarioRepository.findOne(id);
  }

  async criar(usuarioDto: UsuarioDto): Promise<Usuario> {
    try {
      const usuario = usuarioFactory(usuarioDto);
      const resultado = await this.usuarioRepository.save(usuario);
      return resultado;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Falha ao cadastrar um novo usuário. Motivo: ${error.message}`
        );
      }
      throw error;
    }
  }

  async atualizar(id: number, usuarioDto: UsuarioDto): Promise<void> {
    const { senha, ...dadosUsuario } = usuarioDto;
    await this.usuarioRepository.update(id, dadosUsuario);
  }

  async remover(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
}
