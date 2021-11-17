import { CriarEquipamentoDto } from "../@types/dto/EquipamentoDto";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { Equipamento } from "models/EquipamentoEntity";
export class EquipamentoService implements IEquipamentoService {
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
