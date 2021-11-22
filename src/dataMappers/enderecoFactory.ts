import { CadastrarEnderecoDto } from "../@types/dto/EnderecoDto";
import { Endereco } from "../models/EnderecoEntity";

export const enderecoFactory = (
  enderecoDto: CadastrarEnderecoDto
): Endereco => {
  const endereco = new Endereco();
  endereco.cep = enderecoDto.cep;
  endereco.logradouro = enderecoDto.logradouro;
  endereco.complemento = enderecoDto.complemento;
  endereco.bairro = enderecoDto.bairro;
  endereco.estado = enderecoDto.uf;
  endereco.numero = enderecoDto.numero;
  return endereco;
};
