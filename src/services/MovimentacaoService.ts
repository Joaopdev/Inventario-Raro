import { MovimentacaoDto } from "../@types/dto/MovimentacaoDto";
import { IMovimentacaoRepository } from "../@types/repositories/IMovimentacaoRepository";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { Movimentacao } from "../models/MovimentacaoEntity";
import { Inject, Service } from "typedi";

@Service("MovimentacaoService")
export class MovimentacaoService implements IMovimentacaoService {
  constructor(
    @Inject("MovimentacaoService")
    private movimentacaoRepository: IMovimentacaoRepository
  ) {}

  async listar(): Promise<Movimentacao[]> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }

  async buscar(id: number): Promise<Movimentacao> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }

  async criar(movimentacaoDto: MovimentacaoDto): Promise<Movimentacao> {
    /**
     * todo
     */
     throw new Error("Method not implemented.");
  }
};
