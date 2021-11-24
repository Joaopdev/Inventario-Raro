import { AlterarColaboradorDto } from "../../@types/dto/ColaboradorDto";
import { Colaborador } from "../../models/ColaboradorEntity";

export const atualizaColaborador = (
  colaborador: Colaborador,
  colaboradorAlterado: AlterarColaboradorDto
): Colaborador => {
  const { email, endereco, nome, telefone, dataInicio } = {
    ...colaboradorAlterado,
  };
  if (dataInicio) {
    colaborador.dataInicio = new Date(dataInicio);
  }
  colaborador.endereco = { ...colaborador.endereco, ...endereco };

  const novasPropriedades = { email, nome, telefone };
  const colaboradorAtualizado = { ...colaborador, ...novasPropriedades };

  return colaboradorAtualizado;
};
