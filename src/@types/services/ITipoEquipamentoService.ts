import { TipoEquipamento } from "models/TipoEquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoService {
  criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<TipoEquipamento>;
  listarTipoEquipamento(): Promise<TipoEquipamento>;
}
