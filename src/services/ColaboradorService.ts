import { IColaboradorRepository } from "../@types/repositories/IColaboradorRepository";
import { IColaboradorService } from "../@types/services/IColaboradorService";
import { Inject, Service } from "typedi";
import { Colaborador } from "../models/ColaboradorEntity";
import {
  AlterarColaboradorDto,
  RetornoColaboradorCriadoDto,
  CriarColaboradorDto,
  RetornoColaboradorEquipamentosCriadoDto,
} from "../@types/dto/ColaboradorDto";
import { colaboradorFactory } from "../dataMappers/colaborador/colaboradorFactory";
import { ColaboradorNaoExiste } from "../@types/errors/ColaboradorNaoExiste";
import { omitEnderecoId } from "../dataMappers/colaborador/omitEnderecoId";
import { atualizaColaborador } from "../dataMappers/colaborador/atualizaColaborador";
import { omitEquipamentosId } from "../dataMappers/colaborador/omitEquipamentosId";
import { Equipamento } from "../models/EquipamentoEntity";

import { CriarMovimentacaoDto } from "../@types/dto/MovimentacaoDto";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { IEmailService } from "../@types/services/IEmailService";
import { Operacao } from "../@types/enums/Operacao";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";

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
    const novoColaborador = colaboradorFactory(colaboradorDto);
    await this.colaboradorRepository.save(novoColaborador);
    const colaboradorTratado = omitEnderecoId(novoColaborador);
    return colaboradorTratado;
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
  async buscarEquipamentoDoColaborador(
    id: number
  ): Promise<RetornoColaboradorEquipamentosCriadoDto> {
    const colaboradorComEquipamento =
      await this.colaboradorRepository.findEquipamentoByColaborador(id);
    const colaboradorTratado = omitEquipamentosId(colaboradorComEquipamento);
    return colaboradorTratado;
  }
  async geraMovimentacaoColaborador(
    authorization: string,
    novaMovimentacao: CriarMovimentacaoDto
  ): Promise<void> {
    const colaboradorCompleto = await this.atualizaEquipamentoDoColaborador(
      novaMovimentacao.colaboradorId,
      novaMovimentacao.equipamentoId
    );
    console.log("COLABORADOR COMPLETO", colaboradorCompleto);
    const equipamentoMovimentado = colaboradorCompleto.equipamentos.find(
      (equipamento) => equipamento.id === novaMovimentacao.equipamentoId
    );
    console.log("EQUPAMENTO MOVIMENTADO", equipamentoMovimentado);
    const movimentacao =
      await this.movimentacaoService.geraMovimentacaoColaborador(
        authorization,
        novaMovimentacao,
        equipamentoMovimentado
      );
    console.log("gerou movimentacao", movimentacao);
    equipamentoMovimentado.tipoEquipamento =
      await this.atualizaQuantidadeDeEquipamentos(
        movimentacao.tipoMovimentacao,
        equipamentoMovimentado.tipoEquipamento
      );
    console.log(equipamentoMovimentado.tipoEquipamento);
    await this.emailService.alertarQuantidadeCritica(
      equipamentoMovimentado.tipoEquipamento
    );
    return;
  }

  async atualizaEquipamentoDoColaborador(
    colaboradorId: number,
    equipamentoId: number
  ): Promise<Colaborador> {
    const colaboradorComEquipamento =
      await this.colaboradorRepository.findEquipamentoByColaborador(
        colaboradorId
      );
    const equipamentoAdicionado = new Equipamento();
    equipamentoAdicionado.id = equipamentoId;
    colaboradorComEquipamento.equipamentos.push(equipamentoAdicionado);
    await this.colaboradorRepository.save(colaboradorComEquipamento);
    return await this.colaboradorRepository.findEquipamentoByColaborador(
      colaboradorId
    );
  }
  async atualizaQuantidadeDeEquipamentos(
    tipoMovimentacao: TipoMovimentacao,
    tipoEquipamento: TipoEquipamento
  ): Promise<TipoEquipamento> {
    tipoMovimentacao === "envio"
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
}
