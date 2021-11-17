import { CriarParametroDto } from "../@types/dto/ParametroDto";
import { Parametro } from "models/ParametroEntity";
import { IParametroService } from "../@types/services/IParametroService";

export class ParametroService implements IParametroService {
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
