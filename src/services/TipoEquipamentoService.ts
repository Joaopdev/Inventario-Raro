import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Inject, Service } from "typedi";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";
import { tipoEquipamentoFactory } from "../dataMappers/tipoEquipamentoFactory";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { QueryFailedError } from "typeorm";
import { TipoEquipamentoJaExiste } from "../@types/errors/TipoEquipamentoJaExiste";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository
  ) {}

  public async criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<TipoEquipamento> {
    try {
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);

      const resultado = await this.tipoEquipamentoRepository.save(
        tipoEquipamento
      );

      return resultado;
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

  async listarTipoEquipamento(): Promise<TipoEquipamento[]> {
    return await this.tipoEquipamentoRepository.find();
  }

  async buscarTipoEquipamento(id: number): Promise<TipoEquipamento> {
    const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    return tipoEquipamento;
  }

  async atualizarTipoEquipamento(
    id: number,
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<TipoEquipamento> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamento(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    const { descricao, modelo, quantidade, tipo } = {
      ...tipoEquipamentoDto,
    };

    const tipoEquipamentoAtualizadoDto = {
      descricao,
      modelo,
      quantidade,
      tipo,
    };

    const tipoEquipamentoAtualizado = {
      ...tipoEquipamento,
      ...tipoEquipamentoAtualizadoDto,
    };

    if (tipoEquipamentoDto.parametro) {
      tipoEquipamentoAtualizado.parametro = {
        ...tipoEquipamento.parametro,
        ...tipoEquipamentoDto.parametro,
      };
    }

    return await this.tipoEquipamentoRepository.save(tipoEquipamentoAtualizado);
  }

  async removerTipoEquipamento(id: number): Promise<void> {
    const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }
    await this.tipoEquipamentoRepository.remove(tipoEquipamento);
  }
}
