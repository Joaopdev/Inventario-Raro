import { Inject, Service } from "typedi";
import { UsuarioDto } from "../@types/dto/UsuarioDto";
import { IUsuarioService } from "../@types/services/IUsuarioService";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Usuario } from "models/UsuarioEntity";

@Service("UsuarioService")
export class UsuarioService implements IUsuarioService {
  constructor(
    @Inject("UserRepository") private userRepository: IUsuarioRepository
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.userRepository.find();
  }

  async buscar(id: number): Promise<Usuario> {
    return this.userRepository.findOne(id);
  }

  async criar(UsuarioDto: UsuarioDto): Promise<Usuario> {
    return this.userRepository.save(UsuarioDto);
  }

  async atualizar(id: number, UsuarioDto: UsuarioDto): Promise<void> {
    await this.userRepository.save({ ...UsuarioDto, id });
  }

  async remover(id: number): Promise<void> {
    const userToRemove = await this.userRepository.findOne(id);
    if (!userToRemove) {
      throw new Error("User not found!");
    }

    await this.userRepository.remove(userToRemove);
  }
}
