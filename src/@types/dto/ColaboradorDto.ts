import { CadastrarEnderecoDto, RetornoEnderecoCriadoDto } from "./EnderecoDto";

export type ColaboradorDto = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataInicio: string;
  endereco: CadastrarEnderecoDto;
};
export type CriarColaboradorDto = Omit<ColaboradorDto, "id">;

export type ColaboradorTratado = {
  nome: string;
  email: string;
  telefone: string;
  dataInicio: Date;
  endereco: RetornoEnderecoCriadoDto;
};

export type AlteraColaboradorDto = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataInicio?: string;
  endereco?: CadastrarEnderecoDto;
};
