import { CadastrarEnderecoDto } from "../../@types/dto/EnderecoDto";

export interface IEnderecoService {
  buscaPorCep(cep: string): Promise<CadastrarEnderecoDto>;
}
