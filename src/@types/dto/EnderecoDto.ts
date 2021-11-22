import { Endereco } from "models/EnderecoEntity";

export type EnderecoDto = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type EnderecoDtoCadastro = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: number;
};

export type EnderecoTratado = Omit<Endereco, "id">;
