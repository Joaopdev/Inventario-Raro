import { Inject, Service } from "typedi";
import { UsuarioDto } from "../@types/dto/UsuarioDto";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "../models/UsuarioEntity";

@Service("UsuarioService")
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository
  ) {}

  async listar(): Promise<Usuario[]> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }

  async buscar(id: number): Promise<Usuario> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }

  async criar(usuario: UsuarioDto): Promise<Usuario> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }

  async atualizar(id: number, usuario: UsuarioDto): Promise<void> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }

  async remover(id: number): Promise<void> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }
}
