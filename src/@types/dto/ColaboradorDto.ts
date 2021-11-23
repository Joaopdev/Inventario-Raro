import { CadastrarEnderecoDto, RetornoEnderecoCriadoDto } from "./EnderecoDto";
import { RetornoEquipamentoCriadoDto } from "./EquipamentoDto";
export type ColaboradorDto = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataInicio: string;
  endereco: CadastrarEnderecoDto;
};
export type CriarColaboradorDto = Omit<ColaboradorDto, "id">;

export type RetornoColaboradorCriadoDto = {
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
  equipamentos: RetornoEquipamentoCriadoDto[];
};

export type AlterarColaboradorDto = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataInicio?: string;
  endereco?: CadastrarEnderecoDto;
};
