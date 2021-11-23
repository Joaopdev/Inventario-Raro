import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { EntityRepository, Repository } from "typeorm";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";

@EntityRepository(TipoEquipamento)
export class TipoEquipamentoRepository
  extends Repository<TipoEquipamento>
  implements ITipoEquipamentoRepository
{
  listarTipoEquipamento(): Promise<TipoEquipamento[]> {
    return this.find({
      relations: ["parametro"],
    });
  }

  findTipoEquipamento(id: number): Promise<TipoEquipamento> {
    return this.findOne({
      where: { id: id },
      relations: ["parametro"],
    });
  }

  findTipoEquipamentoComEquipamentos(id: number): Promise<TipoEquipamento> {
    return this.findOne({
      where: { id: id },
      relations: ["equipamentos"],
    });
  }
}
