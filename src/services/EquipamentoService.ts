import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
} from "../@types/dto/EquipamentoDto";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { Equipamento } from "../models/EquipamentoEntity";
import { Service, Inject } from "typedi";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { equipamentoFactory } from "../dataMappers/equipamentoFactory";
@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository
  ) {}

  async criarEquipamento(
    equipamentoDto: CriarEquipamentoDto
  ): Promise<Equipamento> {
    try {
      const equipamento = equipamentoFactory(equipamentoDto);
      return await this.equipamentoRepository.save(equipamento);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`erro no criar equipamento: ${error.message}`);
      }
      throw error;
    }
  }

  async listarEquipamentos(): Promise<Equipamento[]> {
    try {
      return await this.equipamentoRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao listar equipamentos: ${error.message}`);
      }
      throw error;
    }
  }

  async atualizarEquipamento(
    equipamentoDto: AtualizarEquipamentoDto
  ): Promise<Equipamento> {
    try {
      const equipamento = await this.equipamentoRepository.findOne(
        equipamentoDto.id
      );
      if (!equipamento) {
        throw new Error("equipamento nao existe para ser alterado");
      }
      const equipamentoAtualizado = { ...equipamento, ...equipamentoDto };
      return await this.equipamentoRepository.save(equipamentoAtualizado);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`erro no atualizar equipametno: ${error.message}`);
      }
      throw error;
    }
  }

  async buscarEquipamentoDoColaborador(
    idColaborador: number
  ): Promise<Equipamento[]> {
    try {
      return await this.equipamentoRepository.findEquipamentoDoColaborador(
        idColaborador
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `erro no buscar equipamento colaborador: ${error.message}`
        );
      }
      throw error;
    }
  }

  async removerEquipamento(id: number): Promise<void> {
    try {
      const equipamento = await this.equipamentoRepository.findOne(id);

      if (!equipamento) {
        throw new Error("equipamento inexistente");
      }

      await this.equipamentoRepository.remove(equipamento);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`error no remover equipamento: ${error.message}`);
      }
      throw error;
    }
  }
}
