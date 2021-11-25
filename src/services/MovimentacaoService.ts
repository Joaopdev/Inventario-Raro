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
import { Equipamento } from "../models/EquipamentoEntity";
import { Usuario } from "../models/UsuarioEntity";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";

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
  async geraMovimentacaoEquipamento(
    usuarioId: number,
    equipamento: Equipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void> {
    const usuarioResposanvel = new Usuario();
    usuarioResposanvel.id = usuarioId;
    const movimentacao = new Movimentacao();
    movimentacao.usuario = usuarioResposanvel;
    movimentacao.tipoEquipamento = equipamento.tipoEquipamento;
    movimentacao.equipamento = equipamento;
    movimentacao.dataMovimentacao = new Date();
    movimentacao.tipoMovimentacao = tipoMovimentacao;
    await this.movimentacaoRepository.save(movimentacao);
    return;
  }

  async geraMovimentacaoTipoEquipamento(
    usuarioId: number,
    tipoEquipamento: TipoEquipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void> {
    const usuarioResponsavel = new Usuario();
    usuarioResponsavel.id = usuarioId;
    const movimentacao = new Movimentacao();
    movimentacao.usuario = usuarioResponsavel;
    movimentacao.tipoEquipamento = tipoEquipamento;
    movimentacao.dataMovimentacao = new Date();
    movimentacao.tipoMovimentacao = tipoMovimentacao;
    await this.movimentacaoRepository.save(movimentacao);
    console.log("teste");
    return;
  }
}
