import { Usuario } from "../models/UsuarioEntity";
import { EntityRepository, Repository } from "typeorm";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";
import { Role } from "../@types/enums/Role";

@EntityRepository(Usuario)
export class UsuarioRepository
  extends Repository<Usuario>
  implements IUsuarioRepository
{
  async findByEmail(usuarioEmail: string): Promise<Usuario> {
    return await this.findOne({
      where: { email: usuarioEmail },
    });
  }

  async findAdmins(): Promise<Usuario[]> {
    return this.find({
      where: { role: Role.Admin },
    });
  }
}
