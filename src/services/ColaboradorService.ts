import { IColaboradorRepository } from "../@types/repositories/IColaboradorRepository";
import { IColaboradorService } from "../@types/services/IColaboradorService";
import { Inject, Service } from "typedi";
import { Colaborador } from "../models/ColaboradorEntity";
import {
  AlterarColaboradorDto,
  RetornoColaboradorCriadoDto,
  CriarColaboradorDto,
} from "../@types/dto/ColaboradorDto";
import { colaboradorFactory } from "../dataMappers/colaborador/colaboradorFactory";
import { ColaboradorNaoExiste } from "../@types/errors/ColaboradorNaoExiste";
import { omitEnderecoId } from "../dataMappers/colaborador/omitEnderecoId";
import { atualizaColaborador } from "../dataMappers/colaborador/atualizaColaborador";
import { Equipamento } from "../models/EquipamentoEntity";
import { CriarMovimentacaoDto } from "../@types/dto/MovimentacaoDto";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { IEmailService } from "../@types/services/IEmailService";
import { Operacao } from "../@types/enums/Operacao";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { QueryFailedError } from "typeorm";
import { ColaboradorJaExiste } from "../@types/errors/ColaboradorJaExiste";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { EnumMovimentacaoColaboradorIncorreta } from "../@types/errors/EnumMovimentacaoColaboradorIncorreta";
import { EquipamentoNaoEstaEmPosseDoColaborador } from "../@types/errors/EquipamentoNaoEstaEmPosseDoColaborador";
import { ColaboradorPossuiEquipamentos } from "../@types/errors/ColaboradorPossuiEquipamentos";

@Service("ColaboradorService")
export class ColaboradorService implements IColaboradorService {
  constructor(
    @Inject("ColaboradorRepository")
    private colaboradorRepository: IColaboradorRepository,
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService,
    @Inject("TipoEquipamentoService")
    private tipoEquipamentoService: ITipoEquipamentoService,
    @Inject("EmailService")
    private emailService: IEmailService
  ) {}
  async listar(): Promise<RetornoColaboradorCriadoDto[]> {
    const colaboradores = await this.colaboradorRepository.findAll();
    const colaboradoresTratados = colaboradores.map((colaborador) => {
      return omitEnderecoId(colaborador);
    });
    return colaboradoresTratados;
  }
  async buscar(colaboradorId: number): Promise<RetornoColaboradorCriadoDto> {
    const colaborador = await this.checaColaborador(colaboradorId);
    const colaboradorTratado = omitEnderecoId(colaborador);
    return colaboradorTratado;
  }
  async criar(
    colaboradorDto: CriarColaboradorDto
  ): Promise<RetornoColaboradorCriadoDto> {
    try {
      const novoColaborador = colaboradorFactory(colaboradorDto);
      const colaboradorSalvo = await this.colaboradorRepository.save(
        novoColaborador
      );
      return omitEnderecoId(colaboradorSalvo);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === ColaboradorJaExiste.CODE) {
          throw new ColaboradorJaExiste();
        }
        throw error;
      }
    }
  }
  async atualizar(
    id: number,
    colaboradorDtoAtualizado: AlterarColaboradorDto
  ): Promise<void> {
    const colaborador = await this.checaColaborador(id);
    const colaboradorAtualizado = atualizaColaborador(
      colaborador,
      colaboradorDtoAtualizado
    );
    await this.colaboradorRepository.save(colaboradorAtualizado);
    return;
  }
  async remover(id: number): Promise<void> {
    const colaboradorPraRemover = await this.checaColaborador(id);
    await this.colaboradorRepository.remove(colaboradorPraRemover);
    return;
  }
  async buscarEquipamentoDoColaborador(id: number): Promise<Colaborador> {
    const colaboradorComEquipamento =
      await this.colaboradorRepository.findEquipamentoByColaborador(id);
    return colaboradorComEquipamento;
  }
  async geraMovimentacaoColaborador(
    colaboradorId: number,
    authorization: string,
    novaMovimentacao: CriarMovimentacaoDto
  ): Promise<void> {
    novaMovimentacao.colaboradorId = colaboradorId;
    const equipamentoMovimentado = await this.atualizaEquipamentoDoColaborador(
      novaMovimentacao.colaboradorId,
      novaMovimentacao.equipamentoId,
      novaMovimentacao.tipoMovimentacao
    );
    const movimentacao =
      await this.movimentacaoService.geraMovimentacaoColaborador(
        authorization,
        novaMovimentacao,
        equipamentoMovimentado
      );
    equipamentoMovimentado.tipoEquipamento =
      await this.atualizaQuantidadeDeEquipamentos(
        movimentacao.tipoMovimentacao,
        equipamentoMovimentado.tipoEquipamento
      );
    await this.emailService.alertarQuantidadeCritica(
      equipamentoMovimentado.tipoEquipamento
    );
    return;
  }
  async inativaColaborador(id: number): Promise<void> {
    const colaboradorComEquipamentos =
      await this.colaboradorRepository.findEquipamentoByColaborador(id);
    if (colaboradorComEquipamentos.equipamentos.length > 0) {
      throw new ColaboradorPossuiEquipamentos();
    }
    colaboradorComEquipamentos.dataRecisao = new Date();
    await this.colaboradorRepository.save(colaboradorComEquipamentos);
    return;
  }

  async atualizaEquipamentoDoColaborador(
    colaboradorId: number,
    equipamentoId: number,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<Equipamento> {
    const colaboradorComEquipamento =
      await this.colaboradorRepository.findEquipamentoByColaborador(
        colaboradorId
      );
    if (!colaboradorComEquipamento) {
      throw new ColaboradorNaoExiste();
    }
    if (tipoMovimentacao === TipoMovimentacao.Devolucao) {
      const equipamentoRemovido = this.buscaEquipamentoNoColaborador(
        colaboradorComEquipamento,
        equipamentoId
      );

      if (!equipamentoRemovido) {
        throw new EquipamentoNaoEstaEmPosseDoColaborador();
      }

      const equipamentosAtualizados =
        colaboradorComEquipamento.equipamentos.filter(
          (equipamento) => equipamento.id !== equipamentoRemovido.id
        );

      colaboradorComEquipamento.equipamentos = equipamentosAtualizados;
      await this.colaboradorRepository.save(colaboradorComEquipamento);

      return equipamentoRemovido;
    } else if (tipoMovimentacao === TipoMovimentacao.Envio) {
      const equipamentoAdicionado = new Equipamento();
      equipamentoAdicionado.id = equipamentoId;
      colaboradorComEquipamento.equipamentos.push(equipamentoAdicionado);
      await this.colaboradorRepository.save(colaboradorComEquipamento);
      const colaboradorAtualizado =
        await this.colaboradorRepository.findEquipamentoByColaborador(
          colaboradorId
        );
      return this.buscaEquipamentoNoColaborador(
        colaboradorAtualizado,
        equipamentoId
      );
    } else {
      throw new EnumMovimentacaoColaboradorIncorreta();
    }
  }
  async atualizaQuantidadeDeEquipamentos(
    tipoMovimentacao: TipoMovimentacao,
    tipoEquipamento: TipoEquipamento
  ): Promise<TipoEquipamento> {
    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }
    tipoMovimentacao === TipoMovimentacao.Envio
      ? (tipoEquipamento =
          await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
            tipoEquipamento.id,
            Operacao.subtracao
          ))
      : (tipoEquipamento =
          await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
            tipoEquipamento.id,
            Operacao.soma
          ));
    return tipoEquipamento;
  }

  private async checaColaborador(id: number): Promise<Colaborador> {
    const colaborador = await this.colaboradorRepository.findById(id);
    if (!colaborador) {
      throw new ColaboradorNaoExiste();
    }
    return colaborador;
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
}
