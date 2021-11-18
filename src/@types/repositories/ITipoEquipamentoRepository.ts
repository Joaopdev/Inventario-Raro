import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoRepository {
  save(tipoEquipamentoDto: CriarTipoEquipamentoDto): Promise<TipoEquipamento>;
  find(): Promise<TipoEquipamento[]>;
}
