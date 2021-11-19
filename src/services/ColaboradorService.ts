import { IColaboradorRepository } from "../@types/repositories/IColaboradorRepository";
import { IColaboradorService } from "../@types/services/IColaboradorService";
import { Inject, Service } from "typedi";
import { Colaborador } from "../models/ColaboradorEntity";
import {
  AlteraColaboradorDto,
  ColaboradorDto,
} from "../@types/dto/ColaboradorDto";
import { colaboradorFactory } from "../dataMappers/colaboradorFactory";
import { ColaboradorNaoExiste } from "../@types/errors/ColaboradorNaoExiste";

@Service("ColaboradorService")
export class ColaboradorService implements IColaboradorService {
  constructor(
    @Inject("ColaboradorRepository")
    private colaboradorRepository: IColaboradorRepository
  ) {}
  async listar(): Promise<Colaborador[]> {
    return await this.colaboradorRepository.findAll();
  }
  async buscar(id: number): Promise<Colaborador> {
    return await this.checaColaborador(id);
  }
  async criar(colaboradorDto: ColaboradorDto): Promise<Colaborador> {
    const novoColaborador = colaboradorFactory(colaboradorDto);
    return await this.colaboradorRepository.save(novoColaborador);
  }
  async atualizar(
    id: number,
    colaboradorDtoAtualizado: AlteraColaboradorDto
  ): Promise<void> {
    const colaborador = await this.checaColaborador(id);
    const colaboradorAtualizado = {
      ...colaborador,
      ...colaboradorDtoAtualizado,
    };
    await this.colaboradorRepository.save(colaboradorAtualizado);
    return;
  }
  async remover(id: number): Promise<void> {
    const colaboradorPraRemover = await this.checaColaborador(id);
    await this.colaboradorRepository.remove(colaboradorPraRemover);
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
