import { Equipamento } from "../models/EquipamentoEntity";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Equipamento)
export class EquipamentoRepository
  extends Repository<Equipamento>
  implements IEquipamentoRepository
{
  findEquipamentoDoColaborador(idColaborador: number): Promise<Equipamento[]> {
    return this.find({
      where: { colaborador: { id: idColaborador } },
      relations: ["colaborador", "tipoEquipamento"],
    });
  }
}
