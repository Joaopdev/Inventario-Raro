import { Colaborador } from "../../models/ColaboradorEntity";
import { Equipamento } from "../../models/EquipamentoEntity";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { Usuario } from "../../models/UsuarioEntity";
import { Movimentacao } from "../../models/MovimentacaoEntity";
import { TipoMovimentacao } from "../enums/TipoMovimentacao";

export type MovimentacaoDto = {
  id: number;
  tipoMovimentacao: TipoMovimentacao;
  dataMovimentacao: Date;
  dataInicio: Date;
  dataEntrega?: Date;
  descricao?: string;
};

export type AlteraMovimentacaoDto = {
  tipoMovimentacao?: TipoMovimentacao;
  dataMovimentacao?: string;
  dataInicio?: string;
  descricao?: string;
  dataEntrega?: string;
};

export type CriarMovimentacaoDto = {
  tipoMovimentacao: TipoMovimentacao;
  dataMovimentacao: Date;
  dataInicio: Date;
  dataEntrega?: Date;
  descricao?: string;
  tipoEquipamento: TipoEquipamento;
  equipamento: Equipamento;
  usuario: Usuario;
  colaborador?: Colaborador;
};
