import { Equipamento } from "../models/EquipamentoEntity";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Equipamento)
export class EquipamentoRepository
  extends Repository<Equipamento>
  implements IEquipamentoRepository
{
  findAllEquipamentos(): Promise<Equipamento[]> {
    return this.find({
      where: { ativo: true },
    });
  }

  findEquipamento(id: number): Promise<Equipamento> {
    return this.findOne({
      relations: ["tipoEquipamento", "colaborador"],
      where: { id: id, ativo: true },
    });
  }

  findEquipamentoComParametro(equipamentoId: number): Promise<Equipamento> {
    return this.findOne({
      relations: [
        "tipoEquipamento",
        "tipoEquipamento.parametro",
        "colaborador",
      ],
      where: { id: equipamentoId, ativo: true },
    });
  }
}
