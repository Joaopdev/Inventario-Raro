import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Inject, Service } from "typedi";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";
import { tipoEquipamentoFactory } from "../dataMappers/tipoEquipamentoFactory";

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository
  ) {}

  public async criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<TipoEquipamento> {
    const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);

    const resultado = await this.tipoEquipamentoRepository.save(
      tipoEquipamento
    );

    return resultado;
  }

  async listarTipoEquipamento(): Promise<TipoEquipamento[]> {
    try {
      return await this.tipoEquipamentoRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`erro no listar tipo equipamento: ${error.message}`);
      }
    }
  }

  async buscarTipoEquipamento(id: number): Promise<TipoEquipamento> {
    try {
      return await this.tipoEquipamentoRepository.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`erro no buscar tipo equipamento: ${error.message}`);
      }
    }
  }

  async atualizarTipoEquipamento(
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<TipoEquipamento> {
    try {
      const tipoEquipamento =
        await this.tipoEquipamentoRepository.findTipoEquipamento(
          tipoEquipamentoDto.id
        );

      if (!tipoEquipamento) {
        throw new Error("tipo de equipamento nao existe para ser atualizado");
      }

      const { id, descricao, modelo, quantidade, tipo } = {
        ...tipoEquipamentoDto,
      };

      const tipoEquipamentoAtualizadoDto = {
        id,
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

      return await this.tipoEquipamentoRepository.save(
        tipoEquipamentoAtualizado
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`error no atualizarTipoEquipamento: ${error.message}`);
      }
      throw error;
    }
  }

  async removerTipoEquipamento(id: number): Promise<void> {
    try {
      const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);
      if (!tipoEquipamento) {
        throw new Error("tipo equipamento não existe");
      }
      await this.tipoEquipamentoRepository.remove(tipoEquipamento);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`erro no buscar tipo equipamento: ${error.message}`);
      }
    }
  }
}
