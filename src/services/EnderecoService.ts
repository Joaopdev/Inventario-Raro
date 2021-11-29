import { Inject, Service } from "typedi";
import { IEnderecoService } from "../@types/services/IEnderecoService";
import { CadastrarEnderecoDto } from "../@types/dto/EnderecoDto";
import { ICepClient } from "../@types/clients/ICepClient";

@Service("EnderecoService")
export class EnderecoService implements IEnderecoService {
  constructor(@Inject("CepClient") private cepClient: ICepClient) {}

  async buscaPorCep(cep: string): Promise<CadastrarEnderecoDto> {
    const cepDaApi = await this.cepClient.buscaEnderecoPorCEP(cep);
    const { ibge, gia, ddd, siafi, ...novoCep } = cepDaApi;
    const cepTratado: CadastrarEnderecoDto = {
      ...novoCep,
      ...{ numero: null },
    };
    return cepTratado;
  }
}
