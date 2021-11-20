import { IColaboradorRepository } from "../@types/repositories/IColaboradorRepository";
import { Colaborador } from "../models/ColaboradorEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Colaborador)
export class ColaboradorRepository
  extends Repository<Colaborador>
  implements IColaboradorRepository
{
  findById(usuarioId: number): Promise<Colaborador> {
    return this.findOne({
      relations: ["endereco"],
      where: {
        id: usuarioId,
      },
    });
  }
  findAll(): Promise<Colaborador[]> {
    return this.find({
      relations: ["endereco"],
    });
  }
}
