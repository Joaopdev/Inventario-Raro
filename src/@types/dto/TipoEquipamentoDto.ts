import { EquipamentoDto } from "./EquipamentoDto";
import { AtualizarParametroDto, CriarParametroDto } from "./ParametroDto";

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
  parametro?: AtualizarParametroDto;
};

export type CriarTipoEquipamentoDto = Omit<
  TipoEquipamentoDto,
  "id" | "equipamentos"
>;

export type RetornoColaboradorTipoEquipamentoDto = {
  tipo: string;
  modelo: string;
  descricao?: string;
  quantidade: number;
};
