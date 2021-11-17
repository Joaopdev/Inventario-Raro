import { Equipamento } from "../models/EquipamentoEntity";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Equipamento)
export class EquipamentoRepository
  extends Repository<Equipamento>
  implements IEquipamentoRepository
{
  listar(): Promise<Equipamento[]> {
    throw new Error("Method not implemented.");
  }
}
