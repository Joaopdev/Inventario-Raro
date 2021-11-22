import { EquipamentoDto } from "./EquipamentoDto";
import { AtualizarParametroSemIdDto, CriarParametroDto } from "./ParametroDto";

export type TipoEquipamentoDto = {
  id: number;
  tipo: string;
  modelo: string;
  descricao?: string;
  quantidade: number;
  equipamentos?: EquipamentoDto[];
  parametro?: CriarParametroDto;
};

export type AtualizarTipoEquipamentoDto = {
  tipo?: string;
  modelo?: string;
  descricao?: string;
  quantidade?: number;
  parametro?: AtualizarParametroSemIdDto;
};

export type CriarTipoEquipamentoDto = Omit<
  TipoEquipamentoDto,
  "id" | "equipamentos"
>;
