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

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository
  ) {}

  public async criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<CriarTipoEquipamentoDto> {
    try {
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);

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
    console.log(tipoEquipamento);

    await this.tipoEquipamentoRepository.save(
      atualizaTipoEquipamento(tipoEquipamento, tipoEquipamentoDto)
    );
    return;
  }

  async removerTipoEquipamento(id: number): Promise<void> {
    const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }
    await this.tipoEquipamentoRepository.remove(tipoEquipamento);
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
