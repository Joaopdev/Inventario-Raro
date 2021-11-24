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

export type CadastrarEnderecoDto = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
};

export type RetornoEnderecoCriadoDto = Omit<Endereco, "id">;
