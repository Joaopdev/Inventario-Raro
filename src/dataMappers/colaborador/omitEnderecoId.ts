import { RetornoColaboradorCriadoDto } from "../../@types/dto/ColaboradorDto";
import { RetornoEnderecoCriadoDto } from "../../@types/dto/EnderecoDto";
import { Colaborador } from "../../models/ColaboradorEntity";
import { Endereco } from "../../models/EnderecoEntity";

export const omitEnderecoId = (
  colaborador: Colaborador
): RetornoColaboradorCriadoDto => {
  const { endereco, ...colaboradorTratado } = colaborador;
  const novoColaborador: RetornoColaboradorCriadoDto = {
    ...colaboradorTratado,
    ...{ endereco: removeEnderecoId(endereco) },
  };
  return novoColaborador;
};

const removeEnderecoId = (endereco: Endereco): RetornoEnderecoCriadoDto => {
  const { id, ...enderecoTratado } = endereco;
  return enderecoTratado;
};
