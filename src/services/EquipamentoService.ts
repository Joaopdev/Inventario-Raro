import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
} from "../@types/dto/EquipamentoDto";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { Equipamento } from "../models/EquipamentoEntity";
import { Service, Inject } from "typedi";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { equipamentoFactory } from "../dataMappers/equipamentoFactory";
import { QueryFailedError } from "typeorm";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { EquipamentoJaExiste } from "../@types/errors/EquipamentoJaExiste";
import { EquipamentoNaoExiste } from "../@types/errors/EquipamentoNaoExiste";
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
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === EquipamentoJaExiste.CODE) {
          throw new EquipamentoJaExiste();
        }
      }
      throw error;
    }
  }

  async listarEquipamentos(): Promise<Equipamento[]> {
    return await this.equipamentoRepository.find();
  }

  async atualizarEquipamento(
    id: number,
    equipamentoDto: AtualizarEquipamentoDto
  ): Promise<Equipamento> {
    const equipamento = await this.equipamentoRepository.findOne(id);
    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
    const equipamentoAtualizado = { ...equipamento, ...equipamentoDto };
    return await this.equipamentoRepository.save(equipamentoAtualizado);
  }

  async buscarEquipamentoDoColaborador(
    idColaborador: number
  ): Promise<Equipamento[]> {
    return await this.equipamentoRepository.findEquipamentoDoColaborador(
      idColaborador
    );
  }

  async removerEquipamento(id: number): Promise<void> {
    const equipamento = await this.equipamentoRepository.findOne(id);

    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }

    await this.equipamentoRepository.remove(equipamento);
  }
}
