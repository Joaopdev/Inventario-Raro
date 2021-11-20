import { CriarParametroDto } from "../@types/dto/ParametroDto";
import { Parametro } from "../models/ParametroEntity";
import { IParametroService } from "../@types/services/IParametroService";
import { Inject, Service } from "typedi";
import { IParametroRepository } from "../@types/repositories/IParametroRepository";
import { parametroFactory } from "dataMappers/parametroFactory";

@Service("ParametroService")
export class ParametroService implements IParametroService {
  public constructor(
    @Inject("ParametroRepository")
    private parametroRepository: IParametroRepository
  ) {}
  async criarParametro(parametroDto: CriarParametroDto): Promise<Parametro> {
    try {
      const parametro = parametroFactory(parametroDto);
      return await this.parametroRepository.save(parametro);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`erro no criar parametro: ${error.message}`);
      }
      throw error;
    }
  }
  async listarParametro(): Promise<Parametro[]> {
    return await this.parametroRepository.find();
  }
}
