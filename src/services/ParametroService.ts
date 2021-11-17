import { CriarParametroDto } from "../@types/dto/ParametroDto";
import { Parametro } from "models/ParametroEntity";
import { IParametroService } from "../@types/services/IParametroService";
import { Inject, Service } from "typedi";
import { IParametroRepository } from "../@types/repositories/IParametroRepository";

@Service("ParametroService")
export class ParametroService implements IParametroService {
  public constructor(
    @Inject("ParametroRepository")
    private parametroRepository: IParametroRepository
  ) {}
  criarParametro(parametro: CriarParametroDto): Promise<Parametro> {
    /**
     * todo
     */
    throw new Error("Method not implemented.");
  }
  listarParametro(): Promise<Parametro[]> {
    /**
     * todo
     */
    throw new Error("Method not implemented.");
  }
}
