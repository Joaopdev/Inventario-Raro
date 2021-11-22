import { CriaColaboradorDto } from "../@types/dto/ColaboradorDto";
import { Colaborador } from "../models/ColaboradorEntity";
import { enderecoFactory } from "./enderecoFactory";

export const colaboradorFactory = (
  novoColaborador: CriaColaboradorDto
): Colaborador => {
  const colaborador = new Colaborador();
  colaborador.nome = novoColaborador.nome;
  colaborador.email = novoColaborador.email;
  colaborador.telefone = novoColaborador.telefone;
  colaborador.dataInicio = new Date(novoColaborador.dataInicio);
  colaborador.endereco = enderecoFactory(novoColaborador.endereco);
  return colaborador;
};
