import { IColaboradorRepository } from "../@types/repositories/IColaboradorRepository";
import { Colaborador } from "models/ColaboradorEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Colaborador)
export class ColaboradorRepository
  extends Repository<Colaborador>
  implements IColaboradorRepository
{
  findByEmail(emailColaborador: "string"): Promise<Colaborador> {
    return this.findOne({
      relations: ["equipamentos"],
      where: {
        email: emailColaborador,
      },
    });
  }
  findAll(): Promise<Colaborador[]> {
    return this.find({
      relations: ["equipamentos"],
    });
  }
  findById(colaboradorId: number): Promise<Colaborador> {
    return this.findOne({ where: { id: colaboradorId } });
  }
}
