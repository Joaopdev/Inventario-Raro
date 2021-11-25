import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Inject, Service } from "typedi";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";
import { tipoEquipamentoFactory } from "../dataMappers/tipoEquipamento/tipoEquipamentoFactory";
import { omitIdTipoEquipamento } from "../dataMappers/tipoEquipamento/omitIdTipoEquipamento";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { QueryFailedError } from "typeorm";
import { TipoEquipamentoJaExiste } from "../@types/errors/TipoEquipamentoJaExiste";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { atualizaTipoEquipamento } from "../dataMappers/tipoEquipamento/atualizaTipoEquipamento";
import { Operacao } from "../@types/enums/Operacao";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { decode } from "jsonwebtoken";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { ExitemEquipamentosCadastradosComEsteTipoEquipamento } from "../@types/errors/ExistemEquipamentosCadastradosComEsteTipoEquipamento";

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository,
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService
  ) {}

  public async criarTipoEquipamento(
    token: string,
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<CriarTipoEquipamentoDto> {
    try {
      const usuario = decode(token) as TokenPayload;
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);
      const movimentacao =
        await this.movimentacaoService.geraMovimentacaoTipoEquipamento(
          usuario.id,
          tipoEquipamento,
          TipoMovimentacao.Entrada
        );
      tipoEquipamento.movimentacoes.push(movimentacao);
      await this.tipoEquipamentoRepository.save(tipoEquipamento);

      return omitIdTipoEquipamento(tipoEquipamento);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === TipoEquipamentoJaExiste.CODE) {
          throw new TipoEquipamentoJaExiste();
        }
      }
      throw error;
    }
  }

  async listarTipoEquipamento(): Promise<CriarTipoEquipamentoDto[]> {
    const listaTipoEquipamento =
      await this.tipoEquipamentoRepository.listarTipoEquipamento();

    return listaTipoEquipamento.map(omitIdTipoEquipamento);
  }

  async buscarTipoEquipamento(id: number): Promise<TipoEquipamento> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamento(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    return tipoEquipamento;
  }

  async buscarTipoEquipamentoComEquipamentos(
    id: number
  ): Promise<TipoEquipamento> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamentoComEquipamentos(
        id
      );

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    return tipoEquipamento;
  }

  async atualizarTipoEquipamento(
    id: number,
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<void> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamento(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    await this.tipoEquipamentoRepository.save(
      atualizaTipoEquipamento(tipoEquipamento, tipoEquipamentoDto)
    );
    return;
  }

  async removerTipoEquipamento(id: number): Promise<void> {
    try {
      const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);

      if (!tipoEquipamento) {
        throw new TipoEquipamentoNaoExiste();
      }
      await this.tipoEquipamentoRepository.remove(tipoEquipamento);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === "ER_ROW_IS_REFERENCED_2") {
          throw new ExitemEquipamentosCadastradosComEsteTipoEquipamento();
        }
      }
      throw error;
    }
  }

  async atualizaQuantidadeTipoEquipamento(
    id: number,
    operacao: Operacao
  ): Promise<TipoEquipamento> {
    const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);

    if (operacao === Operacao.soma) {
      tipoEquipamento.quantidade += 1;
    } else {
      tipoEquipamento.quantidade -= 1;
    }

    return await this.tipoEquipamentoRepository.save(tipoEquipamento);
  }
}
