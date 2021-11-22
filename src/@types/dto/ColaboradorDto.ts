import { Colaborador } from "../../models/ColaboradorEntity";
import { EnderecoDtoCadastro, EnderecoTratado } from "./EnderecoDto";

export type ColaboradorDto = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataInicio: string;
  endereco: EnderecoDtoCadastro;
};
export type CriaColaboradorDto = Omit<ColaboradorDto, "id">;

export type ColaboradorTratado = {
  nome: string;
  email: string;
  telefone: string;
  dataInicio: Date;
  endereco: EnderecoTratado;
};

export type AlteraColaboradorDto = {
  nome?: string;
  email?: string;
  telefone?: string;
  dataInicio?: string;
  endereco?: EnderecoDtoCadastro;
};
