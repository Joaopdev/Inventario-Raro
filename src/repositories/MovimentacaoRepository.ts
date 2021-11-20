import { IMovimentacaoRepository } from "../@types/repositories/IMovimentacaoRepository";
import { Movimentacao } from "../models/MovimentacaoEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Movimentacao)
export class MovimentacaoRepository
  extends Repository<Movimentacao>
  implements IMovimentacaoRepository {}
