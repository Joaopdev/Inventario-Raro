import { CriarTipoEquipamentoDto } from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";

export class TipoEquipamentoService implements ITipoEquipamentoService {
  criarTipoEquipamento(
    tipoEquipamento: CriarTipoEquipamentoDto
  ): Promise<TipoEquipamento> {
    /**
     * todo
     */
    throw new Error("Method not implemented.");
  }
  listarTipoEquipamento(): Promise<TipoEquipamento> {
    /**
     * todo
     */
    throw new Error("Method not implemented.");
  }
}
