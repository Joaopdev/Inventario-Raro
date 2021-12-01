import * as faker from "faker";
import { TipoEquipamentoRepository } from "../../repositories/TipoEquipamentoRepository";
import { TipoEquipamentoService } from "../../services/TipoEquipamentoService";
import { MovimentacaoService } from "../../services/MovimentacaoService";
import { MovimentacaoRepository } from "../../repositories/MovimentacaoRepository";
import { EmailService } from "../../services/EmailService";
import { EnviarEmail } from "../../clients/EnviarEmail";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { EquipamentoRepository } from "../../repositories/EquipamentoRepository";
import { CriarTipoEquipamentoDto } from "../../@types/dto/TipoEquipamentoDto";
import { tipoEquipamentoFactory } from "../../dataMappers/tipoEquipamento/tipoEquipamentoFactory";
import { TipoEquipamentoNaoExiste } from "../../@types/errors/TipoEquipamentoNaoExiste";

describe("TipoEquipamentoService", () => {
  let token: string;
  let tipoEquipamentoDto: CriarTipoEquipamentoDto;
  let tipoEquipamentoRepository: TipoEquipamentoRepository;
  let tipoEquipamentoService: TipoEquipamentoService;
  let movimentacaoService: MovimentacaoService;
  let emailClient: EnviarEmail;
  let movimentacaoRepository: MovimentacaoRepository;
  let emailService: EmailService;
  let equipamentoRepository: EquipamentoRepository;
  let usuarioRepository: UsuarioRepository;
  beforeEach(jest.clearAllMocks);
  beforeEach(() => {
    equipamentoRepository = new EquipamentoRepository();
    usuarioRepository = new UsuarioRepository();
    emailClient = new EnviarEmail();
    emailService = new EmailService(emailClient, usuarioRepository);
    movimentacaoRepository = new MovimentacaoRepository();
    movimentacaoService = new MovimentacaoService(
      movimentacaoRepository,
      emailService,
      equipamentoRepository
    );
    tipoEquipamentoRepository = new TipoEquipamentoRepository();
    tipoEquipamentoService = new TipoEquipamentoService(
      tipoEquipamentoRepository,
      movimentacaoService
    );
    tipoEquipamentoDto = {
      tipo: faker.commerce.productName(),
      modelo: faker.commerce.productAdjective(),
      descricao: faker.commerce.productDescription(),
      parametro: {
        quantidadeCritica: faker.datatype.number(),
        tempoMedioConsumo: faker.datatype.number(),
        tempoMedioEnvio: faker.datatype.number(),
        tempoMedioReposicao: faker.datatype.number(),
      },
    };
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJub21lIjoic3RyaW5nIiwiaWQiOjEwLCJlbWFpbCI6InN0cmluZyIsImlhdCI6MTYzNzk0NDQwNH0.Bp2XvAIu6IkbqYkCDuzyTN_OmUWvZamw1uS424DtyfE";
  });
  describe("criarTipoEquipamento", () => {
    it("deve criar um tipo equipamento", async () => {
      tipoEquipamentoFactory(tipoEquipamentoDto);
      jest
        .spyOn(movimentacaoService, "criarMovimentacaoTipoEquipamento")
        .mockResolvedValue(undefined);
      const criarTipoEquipamento = tipoEquipamentoService.criarTipoEquipamento(
        token,
        tipoEquipamentoDto
      );
      await expect(criarTipoEquipamento).resolves.toEqual(tipoEquipamentoDto);
    });

    it("deve levantar um erro ao criar um tipo equipamento", async () => {
      jest
        .spyOn(movimentacaoService, "criarMovimentacaoTipoEquipamento")
        .mockRejectedValueOnce(new Error("ER_DUP_ENTRY"));
      const criarTipoEquipamento = tipoEquipamentoService.criarTipoEquipamento(
        token,
        tipoEquipamentoDto
      );
      await expect(criarTipoEquipamento).rejects.toThrow("ER_DUP_ENTRY");
    });
  });

  describe("listarTipoEquipamento", () => {
    it("deve listar tipo equipamento", async () => {
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);
      const listaMock = [tipoEquipamento];
      jest
        .spyOn(tipoEquipamentoRepository, "listarTipoEquipamento")
        .mockResolvedValue(listaMock);
      const listaTipoEquipamento =
        tipoEquipamentoService.listarTipoEquipamento();
      await expect(listaTipoEquipamento).resolves.toEqual([tipoEquipamentoDto]);
    });
  });

  describe("buscarTipoEquipamento", () => {
    it("deve buscar tipo equipamento pelo id", async () => {
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);
      tipoEquipamento.id = faker.datatype.number();
      jest
        .spyOn(tipoEquipamentoRepository, "findTipoEquipamento")
        .mockResolvedValue(tipoEquipamento);
      const buscarTipoEquipamento =
        tipoEquipamentoService.buscarTipoEquipamento(tipoEquipamento.id);
      await expect(buscarTipoEquipamento).resolves.toEqual(tipoEquipamento);
    });

    it("deve levantar um erro ao buscar um tipo equipamento que não existe", async () => {
      jest
        .spyOn(tipoEquipamentoRepository, "findTipoEquipamento")
        .mockResolvedValue(undefined);
      const buscarTipoEquipamento =
        tipoEquipamentoService.buscarTipoEquipamento(faker.datatype.number());
      await expect(buscarTipoEquipamento).rejects.toThrow(
        TipoEquipamentoNaoExiste
      );
    });
  });

  describe("atualizarTipoEquipamento", () => {
    it("deve atualizar tipo equipamento", async () => {
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);
      tipoEquipamento.id = faker.datatype.number();
      jest
        .spyOn(tipoEquipamentoRepository, "findTipoEquipamento")
        .mockResolvedValue(tipoEquipamento);
      jest
        .spyOn(tipoEquipamentoRepository, "save")
        .mockResolvedValue(tipoEquipamento);
      const atualizarTipoEquipamento =
        tipoEquipamentoService.atualizarTipoEquipamento(
          tipoEquipamento.id,
          tipoEquipamentoDto
        );
      await expect(atualizarTipoEquipamento).resolves.toEqual(undefined);
    });

    it("deve levantar um erro ao tentar atualizar um tipo equipamento que não existe", async () => {
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);
      tipoEquipamento.id = faker.datatype.number();
      jest
        .spyOn(tipoEquipamentoRepository, "findTipoEquipamento")
        .mockResolvedValue(undefined);
      jest
        .spyOn(tipoEquipamentoRepository, "save")
        .mockResolvedValue(tipoEquipamento);
      const atualizarTipoEquipamento =
        tipoEquipamentoService.atualizarTipoEquipamento(
          tipoEquipamento.id,
          tipoEquipamentoDto
        );
      await expect(atualizarTipoEquipamento).rejects.toThrow(
        TipoEquipamentoNaoExiste
      );
    });
  });
});
