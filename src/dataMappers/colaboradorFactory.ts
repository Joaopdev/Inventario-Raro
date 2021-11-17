import { ColaboradorDto } from "../@types/dto/ColaboradorDto";
import { Colaborador } from "models/ColaboradorEntity";

export const colaboradorFactory = (
  novoColaborador: ColaboradorDto
): Colaborador => {
  const colaborador = new Colaborador();
  colaborador.nome = novoColaborador.nome;
  colaborador.email = novoColaborador.email;
  colaborador.telefone = novoColaborador.telefone;
  colaborador.dataInicio = novoColaborador.dataInicio;
  return colaborador;
};
