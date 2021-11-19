import { EnderecoDto } from "./EnderecoDto";

export type ColaboradorDto = {
  nome: string;
  email: string;
  telefone: string;
  dataInicio: Date;
  endereco: EnderecoDto;
};

export type AlteraColaboradorDto = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataInicio?: Date;
  endereco?: EnderecoDto;
};
