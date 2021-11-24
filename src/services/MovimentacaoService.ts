import {
  AlteraMovimentacaoDto,
  CriarMovimentacaoDto,
} from "../@types/dto/MovimentacaoDto";
import { IMovimentacaoRepository } from "../@types/repositories/IMovimentacaoRepository";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { Movimentacao } from "../models/MovimentacaoEntity";
import { Inject, Service } from "typedi";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { movimentacaoFactory } from "../dataMappers/movimentacao/movimentacaoFactory";
import { atualizaMovimentacao } from "../dataMappers/movimentacao/atualizaMovimentacao";

@Service("MovimentacaoService")
export class MovimentacaoService implements IMovimentacaoService {
  constructor(
    @Inject("MovimentacaoRepository")
    private movimentacaoRepository: IMovimentacaoRepository
  ) {}

  async listarPorTipoMovimentacao(
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Movimentacao[]> {
    if (tipoMovimentacao) {
      return await this.movimentacaoRepository.findByTipoMovimentacao(
        tipoMovimentacao
      );
    }
    return await this.movimentacaoRepository.findAll();
  }
  async buscar(id: number): Promise<Movimentacao> {
    return await this.movimentacaoRepository.findOneMovimentacao(id);
  }
  async buscarPeloEquipamento(
    equipamentoId: number
  ): Promise<Movimentacao | Movimentacao[]> {
    return await this.movimentacaoRepository.findByEquipamento(equipamentoId);
  }
  async buscarPeloColaborador(
    colaboradorId: number
  ): Promise<Movimentacao | Movimentacao[]> {
    return await this.movimentacaoRepository.findByColaborador(colaboradorId);
  }
  async criar(movimentacaoDto: CriarMovimentacaoDto): Promise<Movimentacao> {
    const novaMovimentacao = movimentacaoFactory(movimentacaoDto);
    return await this.movimentacaoRepository.save(novaMovimentacao);
  }
  async atualizar(
    id: number,
    movimentacaoAlterada: AlteraMovimentacaoDto
  ): Promise<void> {
    const movimentacao = await this.movimentacaoRepository.findOneMovimentacao(
      id
    );
    const movimentacaoAtualizada = atualizaMovimentacao(
      movimentacao,
      movimentacaoAlterada
    );
    await this.movimentacaoRepository.save(movimentacaoAtualizada);
  }
  async remover(id: number): Promise<void> {
    const movimentacao = await this.movimentacaoRepository.findOneMovimentacao(
      id
    );
    await this.movimentacaoRepository.remove(movimentacao);
    return;
  }
}
