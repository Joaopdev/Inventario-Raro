import {
  AtualizarParametroDto,
  CriarParametroDto,
} from "../@types/dto/ParametroDto";
import { Parametro } from "../models/ParametroEntity";
import { IParametroService } from "../@types/services/IParametroService";
import { Inject, Service } from "typedi";
import { IParametroRepository } from "../@types/repositories/IParametroRepository";
import { parametroFactory } from "../dataMappers/parametro/parametroFactory";

@Service("ParametroService")
export class ParametroService implements IParametroService {
  public constructor(
    @Inject("ParametroRepository")
    private parametroRepository: IParametroRepository
  ) {}

  async criarParametro(parametroDto: CriarParametroDto): Promise<Parametro> {
    const parametro = parametroFactory(parametroDto);
    return await this.parametroRepository.save(parametro);
  }

  async listarParametro(): Promise<Parametro[]> {
    return await this.parametroRepository.find();
  }

  async atualizarParametro(
    id: number,
    parametroDto: AtualizarParametroDto
  ): Promise<Parametro> {
    const parametro = await this.parametroRepository.findOne(id);

    if (!parametro) {
      throw new Error("este parametro não existe para ser atualizado");
    }

    const parametroAtualizado = { ...parametro, ...parametroDto };
    return await this.parametroRepository.save(parametroAtualizado);
  }

  async removerParametro(id: number): Promise<void> {
    const parametro = await this.parametroRepository.findOne(id);

    if (!parametro) {
      throw new Error("parametro não existe");
    }

    await this.parametroRepository.remove(parametro);
  }
}
