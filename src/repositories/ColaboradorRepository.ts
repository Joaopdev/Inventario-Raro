import { IColaboradorRepository } from "../@types/repositories/IColaboradorRepository";
import { Colaborador } from "../models/ColaboradorEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Colaborador)
export class ColaboradorRepository
  extends Repository<Colaborador>
  implements IColaboradorRepository
{
  findById(colaboradorId: number): Promise<Colaborador> {
    return this.findOne({
      relations: ["endereco"],
      where: {
        id: colaboradorId,
        dataRecisao: null,
      },
    });
  }
  findAll(): Promise<Colaborador[]> {
    return this.find({
      relations: ["endereco"],
      where: {
        dataRecisao: null,
      },
    });
  }
  findColaboradorCompleto(colaboradorId: number): Promise<Colaborador> {
    return this.findOne({
      relations: [
        "equipamentos",
        "equipamentos.tipoEquipamento",
        "movimentacoes",
      ],
      where: {
        id: colaboradorId,
        dataRecisao: null,
      },
    });
  }
  findColaboradorComEquipamento(colaboradorId: number): Promise<Colaborador> {
    return this.findOne({
      relations: [
        "equipamentos",
        "equipamentos.tipoEquipamento",
        "movimentacoes",
      ],
      where: {
        id: colaboradorId,
        dataRecisao: null,
      },
    });
  }
}
