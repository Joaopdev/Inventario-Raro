import { EquipamentoDto } from "./EquipamentoDto";
import { CriarParametroDto } from "./ParametroDto";

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
  id: number;
  tipo?: string;
  modelo?: string;
  descricao?: string;
  quantidade?: number;
};

export type CriarTipoEquipamentoDto = Omit<
  TipoEquipamentoDto,
  "id" | "equipamentos"
>;
