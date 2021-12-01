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
import { CriarMovimentacaoDto } from "../@types/dto/MovimentacaoDto";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { QueryFailedError } from "typeorm";
import { ColaboradorJaExiste } from "../@types/errors/ColaboradorJaExiste";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { EnumMovimentacaoColaboradorIncorreta } from "../@types/errors/EnumMovimentacaoColaboradorIncorreta";
import { ColaboradorPossuiEquipamentos } from "../@types/errors/ColaboradorPossuiEquipamentos";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { decode } from "jsonwebtoken";
import { IEmailService } from "../@types/services/IEmailService";
import { Equipamento } from "../models/EquipamentoEntity";

@Service("ColaboradorService")
export class ColaboradorService implements IColaboradorService {
  constructor(
    @Inject("ColaboradorRepository")
    private colaboradorRepository: IColaboradorRepository,
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService,
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
      await this.colaboradorRepository.findColaboradorComEquipamento(id);
    return colaboradorComEquipamento;
  }
  async geraMovimentacaoColaborador(
    colaboradorId: number,
    authorization: string,
    novaMovimentacao: CriarMovimentacaoDto
  ): Promise<void> {
    novaMovimentacao.colaboradorId = colaboradorId;
    const usuario = decode(authorization) as TokenPayload;
    const colaboradorComEquipamento =
      await this.colaboradorRepository.findColaboradorCompleto(
        novaMovimentacao.colaboradorId
      );
    if (!colaboradorComEquipamento) {
      throw new ColaboradorNaoExiste();
    }
    if (novaMovimentacao.tipoMovimentacao === TipoMovimentacao.Devolucao) {
      this.movimentacaoService.criarMovimentacaoDevolucao(
        usuario.id,
        colaboradorComEquipamento,
        novaMovimentacao
      );
      await this.colaboradorRepository.save(colaboradorComEquipamento);
      return;
    } else if (novaMovimentacao.tipoMovimentacao === TipoMovimentacao.Envio) {
      await this.movimentacaoService.criarMovimentacaoEnvio(
        usuario.id,
        colaboradorComEquipamento,
        novaMovimentacao
      );
      const colaborador = await this.colaboradorRepository.save(
        colaboradorComEquipamento
      );
      const equipamentoEnviado = this.buscaEquipamentoAdicionado(
        colaborador,
        novaMovimentacao.equipamentoId
      );
      await this.emailService.alertarQuantidadeCritica(
        equipamentoEnviado.tipoEquipamento
      );
      return;
    } else {
      throw new EnumMovimentacaoColaboradorIncorreta();
    }
  }
  async inativaColaborador(id: number): Promise<void> {
    const colaboradorComEquipamentos =
      await this.colaboradorRepository.findColaboradorCompleto(id);
    if (colaboradorComEquipamentos.equipamentos.length > 0) {
      throw new ColaboradorPossuiEquipamentos();
    }
    colaboradorComEquipamentos.dataRecisao = new Date();
    await this.colaboradorRepository.save(colaboradorComEquipamentos);
    return;
  }
  private async checaColaborador(id: number): Promise<Colaborador> {
    const colaborador = await this.colaboradorRepository.findById(id);
    if (!colaborador) {
      throw new ColaboradorNaoExiste();
    }
    return colaborador;
  }
  buscaEquipamentoAdicionado(
    colaborador: Colaborador,
    equipamentoId: number
  ): Equipamento {
    const equipamentoEnviado = colaborador.equipamentos.find(
      (equipamento) => equipamento.id === equipamentoId
    );
    return equipamentoEnviado;
  }
}
