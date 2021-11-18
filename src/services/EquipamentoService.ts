import { CriarEquipamentoDto } from "../@types/dto/EquipamentoDto";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { Equipamento } from "../models/EquipamentoEntity";
import { Service, Inject } from "typedi";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository
  ) {}
  criarEquipamento(equipamentoDto: CriarEquipamentoDto): Promise<Equipamento> {
    /**
     * todo
     */
    throw new Error("Method not implemented.");
  }
  listarEquipamentos(): Promise<Equipamento[]> {
    /**
     * todo
     */
    throw new Error("Method not implemented.");
  }
}
