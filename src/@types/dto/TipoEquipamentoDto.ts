import { EquipamentoDto } from "./EquipamentoDto";
import { ParametroDto } from "./ParametroDto";

export type TipoEquipamentoDto = {
  id: number;
  tipo: string;
  modelo: string;
  descricao: number;
  quantidade: number;
  equipamentos?: EquipamentoDto[];
  parametro: ParametroDto;
};

export type CriarTipoEquipamentoDto = Omit<TipoEquipamentoDto, "id">;
