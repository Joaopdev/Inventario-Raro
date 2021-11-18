import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoRepository {
  save(tipoEquipamento: CriarTipoEquipamentoDto): Promise<TipoEquipamento>;
  find(): Promise<TipoEquipamento[]>;
}
