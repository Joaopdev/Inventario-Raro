import {
  AlterarColaboradorDto,
  ColaboradorDto,
} from "../../@types/dto/ColaboradorDto";
import * as faker from "faker";
import { ColaboradorRepository } from "../../repositories/ColaboradorRepository";
import { ColaboradorService } from "../ColaboradorService";
import { MovimentacaoService } from "../MovimentacaoService";
import { MovimentacaoRepository } from "../../repositories/MovimentacaoRepository";
import { EmailService } from "../EmailService";
import { EquipamentoRepository } from "../../repositories/EquipamentoRepository";
import { EnviarEmail } from "../../clients/EnviarEmail";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { colaboradorFactory } from "../../dataMappers/colaborador/colaboradorFactory";
import { Equipamento } from "../../models/EquipamentoEntity";
import { Colaborador } from "../../models/ColaboradorEntity";
import { ColaboradorNaoExiste } from "../../@types/errors/ColaboradorNaoExiste";
import { ColaboradorPossuiEquipamentos } from "../../@types/errors/ColaboradorPossuiEquipamentos";

describe("ColaboradorService", () => {
  let colaboradorDto: ColaboradorDto;
  let colaboradorRepository: ColaboradorRepository;
  let movimentacaoService: MovimentacaoService;
  let colaboradorService: ColaboradorService;
  let emailClient: EnviarEmail;
  let movimentacaoRepository: MovimentacaoRepository;
  let emailService: EmailService;
  let equipamentoRepository: EquipamentoRepository;
  let usuarioRepository: UsuarioRepository;

  beforeEach(jest.clearAllMocks);
  beforeEach(() => {
    colaboradorDto = {
      id: faker.datatype.number(),
      nome: faker.name.findName(),
      email: faker.internet.email(),
      telefone: faker.phone.phoneNumber(),
      dataInicio: faker.date.recent(),
      endereco: {
        cep: faker.address.zipCode(),
        logradouro: faker.address.streetName(),
        complemento: faker.address.streetPrefix(),
        bairro: faker.address.direction(),
        localidade: faker.address.state(),
        uf: faker.address.country(),
        numero: faker.address.streetSuffix(),
      },
    };
    emailClient = new EnviarEmail();
    usuarioRepository = new UsuarioRepository();
    movimentacaoRepository = new MovimentacaoRepository();
    emailService = new EmailService(emailClient, usuarioRepository);
    equipamentoRepository = new EquipamentoRepository();
    colaboradorRepository = new ColaboradorRepository();
    movimentacaoService = new MovimentacaoService(
      movimentacaoRepository,
      emailService,
      equipamentoRepository
    );
    colaboradorService = new ColaboradorService(
      colaboradorRepository,
      movimentacaoService
    );
  });

  describe("listar", () => {
    it("deve listar os colaboradores que nao possuem data de recisao", async () => {
      const colaborador1 = colaboradorFactory(colaboradorDto);
      const colaborador2 = colaboradorFactory(colaboradorDto);
      const expectedColaborador = [colaborador1, colaborador2];
      const findAllrepo = jest.spyOn(colaboradorRepository, "findAll");
      findAllrepo.mockResolvedValue([colaborador1, colaborador2]);
      const servico = colaboradorService.listar();
      await expect(servico).resolves.toEqual(expectedColaborador);
      expect(findAllrepo).toHaveBeenCalled();
    });
  });

  describe("buscar", () => {
    it("deve buscar o colaborador", async () => {
      const colaborador1 = colaboradorFactory(colaboradorDto);
      colaborador1.id = faker.datatype.number();
      const findById = jest.spyOn(colaboradorRepository, "findById");
      findById.mockResolvedValue(colaborador1);
      const buscar = colaboradorService.buscar(colaborador1.id);
      await expect(buscar).resolves.toEqual(colaborador1);
      expect(findById).toHaveBeenCalled();
    });
    it("deve lançar um erro se o colaborador nao for encontrado", async () => {
      const id = faker.datatype.number();
      const findOne = jest.spyOn(colaboradorRepository, "findById");
      findOne.mockResolvedValue(null);
      const buscar = colaboradorService.buscar(id);
      await expect(buscar).rejects.toThrow(new ColaboradorNaoExiste());
      expect(findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("criar", () => {
    it("deve criar um novo colaborador", async () => {
      const colaborador = colaboradorFactory(colaboradorDto);
      const save = jest.spyOn(colaboradorRepository, "save");
      save.mockResolvedValue(colaborador);
      const criarColaborador = colaboradorService.criar(colaboradorDto);
      await expect(criarColaborador).resolves.toEqual(colaborador);
      expect(save).toHaveBeenCalled();
    });
  });

  describe("atualizar", () => {
    it("deve atualizar um colaborador", async () => {
      const colaborador = colaboradorFactory(colaboradorDto);
      colaborador.id = faker.datatype.number();
      const findOne = jest.spyOn(colaboradorRepository, "findById");
      findOne.mockResolvedValue(colaborador);
      const mudança: AlterarColaboradorDto = {
        nome: "novonome",
        email: "novoemail",
        telefone: "22222222",
      };
      const expectedColaborador = { ...colaborador, ...mudança };
      colaborador.nome = mudança.nome;
      colaborador.email = mudança.email;
      colaborador.telefone = mudança.telefone;
      const save = jest.spyOn(colaboradorRepository, "save");
      save.mockResolvedValue(colaborador);
      const atualizar = colaboradorService.atualizar(colaborador.id, mudança);
      await expect(atualizar).resolves.not.toBeDefined();
      expect(save).toHaveBeenCalledWith(expectedColaborador);
    });
  });

  describe("inativar", () => {
    it("deve adiconar a data de recisao do colaborador", async () => {
      const colaborador = colaboradorFactory(colaboradorDto);
      colaborador.id = faker.datatype.number();
      colaborador.equipamentos = [];
      const findOne = jest.spyOn(
        colaboradorRepository,
        "findColaboradorCompleto"
      );
      const data = faker.date.recent();
      findOne.mockResolvedValue(colaborador);
      colaborador.dataRecisao = data;
      const save = jest.spyOn(colaboradorRepository, "save");
      save.mockResolvedValue(colaborador);
      const inativar = colaboradorService.inativaColaborador(colaborador.id);
      await expect(inativar).resolves.not.toBeDefined();
      expect(findOne).toHaveBeenCalledWith(colaborador.id);
      expect(save).toHaveBeenCalledWith(colaborador);
    });
    it("deve lançar um erro se o colaborador que esta pra ser inativado possuir equipamentos", async () => {
      const colaborador = colaboradorFactory(colaboradorDto);
      colaborador.id = faker.datatype.number();
      colaborador.equipamentos = [new Equipamento()];
      const findOne = jest.spyOn(
        colaboradorRepository,
        "findColaboradorCompleto"
      );
      const data = faker.date.recent();
      findOne.mockResolvedValue(colaborador);
      colaborador.dataRecisao = data;
      const save = jest.spyOn(colaboradorRepository, "save");
      save.mockResolvedValue(colaborador);
      const inativar = colaboradorService.inativaColaborador(colaborador.id);
      await expect(inativar).rejects.toThrow(
        new ColaboradorPossuiEquipamentos()
      );
      expect(findOne).toHaveBeenCalledWith(colaborador.id);
      expect(save).not.toHaveBeenCalledWith(colaborador);
    });
  });
});
