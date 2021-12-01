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
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { decode } from "jsonwebtoken";
import { Equipamento } from "../models/EquipamentoEntity";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { IEmailService } from "../@types/services/IEmailService";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { Colaborador } from "models/ColaboradorEntity";
import { EquipamentoNaoEstaEmPosseDoColaborador } from "../@types/errors/EquipamentoNaoEstaEmPosseDoColaborador";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { EquipamentoNaoExiste } from "../@types/errors/EquipamentoNaoExiste";
import { EquipamentoJaEstaEmPosseDeUmColaborador } from "../@types/errors/EquipamentoJaEstaEmPosseDeUmColaborador";

@Service("MovimentacaoService")
export class MovimentacaoService implements IMovimentacaoService {
  constructor(
    @Inject("MovimentacaoRepository")
    private movimentacaoRepository: IMovimentacaoRepository,
    @Inject("EmailService")
    private emailService: IEmailService,
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository
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

  async criar(
    authorization: string,
    movimentacaoDto: CriarMovimentacaoDto
  ): Promise<Movimentacao> {
    const usuario = decode(authorization) as TokenPayload;
    const novaMovimentacao = movimentacaoFactory(usuario.id, movimentacaoDto);
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
  async criarMovimentacaoEquipamento(
    usuarioId: number,
    equipamento: Equipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void> {
    const criaMovimentacao: CriarMovimentacaoDto = {
      tipoMovimentacao: tipoMovimentacao,
    };
    const movimentacao = movimentacaoFactory(
      usuarioId,
      criaMovimentacao,
      null,
      equipamento
    );
    await this.movimentacaoRepository.save(movimentacao);
    return;
  }
  async criarMovimentacaoTipoEquipamento(
    usuarioId: number,
    tipoEquipamento: TipoEquipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void> {
    const criaMovimentacao: CriarMovimentacaoDto = {
      tipoMovimentacao: tipoMovimentacao,
    };
    const movimentacao = movimentacaoFactory(
      usuarioId,
      criaMovimentacao,
      tipoEquipamento,
      null
    );
    await this.movimentacaoRepository.save(movimentacao);
    return;
  }
  criarMovimentacaoDevolucao(
    usuarioId: number,
    colaboradorComEquipamento: Colaborador,
    novaMovimentacao: CriarMovimentacaoDto
  ): void {
    const equipamentoRemovido = this.buscaEquipamentoNoColaborador(
      colaboradorComEquipamento,
      novaMovimentacao.equipamentoId
    );
    const equipamentosAtualizados = this.removeEquipamentoDoColaborador(
      colaboradorComEquipamento.equipamentos,
      equipamentoRemovido
    );
    equipamentoRemovido.tipoEquipamento = this.atualizaQuantidadeDeEquipamentos(
      novaMovimentacao.tipoMovimentacao,
      equipamentoRemovido.tipoEquipamento
    );

    colaboradorComEquipamento.equipamentos = equipamentosAtualizados;
    const movimentacao = movimentacaoFactory(
      usuarioId,
      novaMovimentacao,
      null,
      equipamentoRemovido
    );
    colaboradorComEquipamento.movimentacoes.push(movimentacao);
    return;
  }
  async criarMovimentacaoEnvio(
    usuarioId: number,
    colaboradorComEquipamento: Colaborador,
    novaMovimentacao: CriarMovimentacaoDto
  ): Promise<void> {
    const equipamentoAdcionado = await this.buscaEquipamentoNoRepo(
      novaMovimentacao.equipamentoId
    );
    equipamentoAdcionado.tipoEquipamento =
      this.atualizaQuantidadeDeEquipamentos(
        novaMovimentacao.tipoMovimentacao,
        equipamentoAdcionado.tipoEquipamento
      );
    await this.emailService.alertarQuantidadeCritica(
      equipamentoAdcionado.tipoEquipamento
    );
    equipamentoAdcionado.colaborador = colaboradorComEquipamento;
    colaboradorComEquipamento.equipamentos.push(equipamentoAdcionado);
    const movimentacao = movimentacaoFactory(
      usuarioId,
      novaMovimentacao,
      null,
      equipamentoAdcionado
    );
    colaboradorComEquipamento.movimentacoes.push(movimentacao);
    return;
  }
  private buscaEquipamentoNoColaborador(
    colaborador: Colaborador,
    equipamentoId: number
  ): Equipamento {
    const equipamentoEspecifico = colaborador.equipamentos.find(
      (equipamento) => equipamento.id === equipamentoId
    );
    return equipamentoEspecifico;
  }
  private removeEquipamentoDoColaborador(
    equipamentos: Equipamento[],
    equipamentoRemovido: Equipamento
  ): Equipamento[] {
    if (!equipamentoRemovido) {
      throw new EquipamentoNaoEstaEmPosseDoColaborador();
    }
    const equipamentosAtualizados = equipamentos.filter(
      (equipamento) => equipamento.id !== equipamentoRemovido.id
    );
    return equipamentosAtualizados;
  }
  private atualizaQuantidadeDeEquipamentos(
    tipoMovimentacao: TipoMovimentacao,
    tipoEquipamento: TipoEquipamento
  ): TipoEquipamento {
    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }
    tipoMovimentacao === TipoMovimentacao.Envio
      ? (tipoEquipamento.quantidade -= 1)
      : (tipoEquipamento.quantidade += 1);

    return tipoEquipamento;
  }
  private async buscaEquipamentoNoRepo(
    equipamentoId: number
  ): Promise<Equipamento> {
    const equipamento =
      await this.equipamentoRepository.findEquipamentoComParametro(
        equipamentoId
      );
    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
    if (equipamento.colaborador) {
      throw new EquipamentoJaEstaEmPosseDeUmColaborador();
    }
    return equipamento;
  }
}
