import { IMovimentacaoRepository } from "../@types/repositories/IMovimentacaoRepository";
import { Movimentacao } from "../models/MovimentacaoEntity";
import { EntityRepository, Repository } from "typeorm";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";

@EntityRepository(Movimentacao)
export class MovimentacaoRepository
  extends Repository<Movimentacao>
  implements IMovimentacaoRepository
{
  findAll(): Promise<Movimentacao[]> {
    return this.find({
      relations: ["usuario", "colaborador", "equipamento", "tipoEquipamento"],
    });
  }
  findByTipoMovimentacao(
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Movimentacao[]> {
    return this.find({
      relations: ["usuario", "colaborador", "equipamento", "tipoEquipamento"],
      where: { tipoMovimentacao: tipoMovimentacao },
    });
  }
  findByColaborador(
    colaboradorId: number
  ): Promise<Movimentacao | Movimentacao[]> {
    return this.find({
      relations: ["usuario", "colaborador", "equipamento", "tipoEquipamento"],
      where: { colaborador: { id: colaboradorId } },
    });
  }
  findByEquipamento(
    equipamentoId: number
  ): Promise<Movimentacao | Movimentacao[]> {
    return this.find({
      relations: ["usuario", "colaborador", "equipamento", "tipoEquipamento"],
      where: { equipamento: { id: equipamentoId } },
    });
  }
  findOneMovimentacao(movimentacaoId: number): Promise<Movimentacao> {
    return this.findOne({
      relations: ["usuario", "colaborador", "equipamento", "tipoEquipamento"],
      where: { id: movimentacaoId },
    });
  }
}
