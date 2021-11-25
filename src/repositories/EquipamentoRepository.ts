import { Equipamento } from "../models/EquipamentoEntity";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Equipamento)
export class EquipamentoRepository
  extends Repository<Equipamento>
  implements IEquipamentoRepository
{
  findEquipamento(equipamentoId: number): Promise<Equipamento> {
    return this.findOne({
      relations: ["tipoEquipamento", "tipoEquipamento.parametro"],
      where: { id: equipamentoId },
    });
  }
}
