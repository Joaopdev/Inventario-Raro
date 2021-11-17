import { CriarTipoEquipamentoDto } from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Inject, Service } from "typedi";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository
  ) {}
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
