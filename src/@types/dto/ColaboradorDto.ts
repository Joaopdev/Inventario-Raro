import { CadastrarEnderecoDto, RetornoEnderecoCriadoDto } from "./EnderecoDto";
import { RetornoColaboradorEquipamentoDto } from "./EquipamentoDto";
export type ColaboradorDto = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataInicio: Date;
  endereco: CadastrarEnderecoDto;
};
export type CriarColaboradorDto = Omit<ColaboradorDto, "id">;

export type RetornoColaboradorCriadoDto = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataInicio: Date;
  endereco: RetornoEnderecoCriadoDto;
};

export type RetornoColaboradorEquipamentosCriadoDto = {
  nome: string;
  email: string;
  telefone: string;
  dataInicio: Date;
  equipamentos: RetornoColaboradorEquipamentoDto[];
};

export type AlterarColaboradorDto = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataInicio?: string;
  endereco?: CadastrarEnderecoDto;
};
