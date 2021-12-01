import * as faker from "faker";
import { CepClient } from "../../clients/CepClient";
import { EnderecoService } from "../../services/EnderecoService";
import {
  CadastrarEnderecoDto,
  EnderecoDto,
} from "../../@types/dto/EnderecoDto";

const resultadoApiCepFactory = (): EnderecoDto => ({
  cep: faker.address.zipCode(),
  logradouro: faker.lorem.sentence(),
  complemento: faker.lorem.sentence(),
  bairro: faker.lorem.word(),
  localidade: faker.lorem.sentence(),
  uf: faker.lorem.sentence(),
  ibge: faker.lorem.sentence(),
  gia: faker.lorem.sentence(),
  ddd: faker.lorem.sentence(),
  siafi: faker.lorem.sentence(),
});

describe("EnderecoService", () => {
  let cepClient: CepClient;
  let enderecoService: EnderecoService;

  const oldEnv = process.env;
  beforeEach(() => {
    process.env.CRYPTO_ALGORITHM = "SHA256";
    process.env.SECRET = faker.datatype.uuid();
    process.env.AUTH_SECRET = faker.datatype.uuid();
  });
  afterEach(() => {
    process.env = oldEnv;
  });

  beforeEach(() => {
    cepClient = new CepClient(null);
    enderecoService = new EnderecoService(cepClient);
  });

  beforeEach(jest.clearAllMocks);

  it("deve buscar um endereço através do CEP", async () => {
    const endereco: EnderecoDto = resultadoApiCepFactory();
    const { ibge, gia, ddd, siafi, ...novoCep } = endereco;
    const cepTratado: CadastrarEnderecoDto = {
      ...novoCep,
      ...{ numero: null },
    };
    const clienteCep = jest.spyOn(cepClient, "buscaEnderecoPorCEP");
    clienteCep.mockResolvedValue(endereco);
    const cep = faker.address.zipCode();
    const busca = enderecoService.buscaPorCep(cep);

    await expect(busca).resolves.toEqual(cepTratado);
    expect(clienteCep).toBeCalledWith(cep);
  });
});
