import { CriarParametroDto } from "../dto/ParametroDto";
import { TipoEquipamento } from "models/TipoEquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../dto/TipoEquipamentoDto";

export interface ITipoEquipamentoService {
  criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto,
    parametroDto: CriarParametroDto
  ): Promise<TipoEquipamento>;
  listarTipoEquipamento(): Promise<TipoEquipamento[]>;
  removerTipoEquipamento(id: number): Promise<void>;
}
