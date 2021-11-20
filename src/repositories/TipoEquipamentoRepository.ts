import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { EntityRepository, Repository } from "typeorm";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";

@EntityRepository(TipoEquipamento)
export class TipoEquipamentoRepository
  extends Repository<TipoEquipamento>
  implements ITipoEquipamentoRepository
{
  buscarTipoEquipamento(id: number): Promise<TipoEquipamento> {
    return this.findOne({
      where: { id: id },
      relations: ["parametro"],
    });
  }
}
