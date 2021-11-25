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

@Service("ColaboradorService")
export class ColaboradorService implements IColaboradorService {
  constructor(
    @Inject("ColaboradorRepository")
    private colaboradorRepository: IColaboradorRepository
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
    const colaboradorSalvo = await this.colaboradorRepository.save(
      colaboradorAtualizado
    );
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
  async atualizaEquipamentoDoColaborador(
    colaboradorId: number,
    equipamentoId: number
  ): Promise<void> {
    const colaboradorComEquipamento =
      await this.colaboradorRepository.findEquipamentoByColaborador(
        colaboradorId
      );
    const equipamentoAdicoionavel = new Equipamento();
    equipamentoAdicoionavel.id = equipamentoId;
    colaboradorComEquipamento.equipamentos.push(equipamentoAdicoionavel);
    await this.colaboradorRepository.save(colaboradorComEquipamento);
    return;
  }

  private async checaColaborador(id: number): Promise<Colaborador> {
    const colaborador = await this.colaboradorRepository.findById(id);
    if (!colaborador) {
      throw new ColaboradorNaoExiste();
    }
    return colaborador;
  }
}
