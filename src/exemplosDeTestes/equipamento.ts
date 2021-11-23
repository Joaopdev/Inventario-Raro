import { TipoEquipamentoRepository } from "../repositories/TipoEquipamentoRepository";
import { Connection } from "typeorm";
import { TipoEquipamentoService } from "../services/TipoEquipamentoService";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { Parametro } from "../models/ParametroEntity";
import { Equipamento } from "../models/EquipamentoEntity";
import createDatabaseConnection from "../config/database/connect";
import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
} from "../@types/dto/TipoEquipamentoDto";
import { CriarParametroDto } from "../@types/dto/ParametroDto";
import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
} from "../@types/dto/EquipamentoDto";
import { ParametroService } from "../services/ParametroService";
import { ParametroRepository } from "../repositories/ParametroRepository";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository";
import { EquipamentoService } from "../services/EquipamentoService";
import { ColaboradorRepository } from "../repositories/ColaboradorRepository";
import { ColaboradorService } from "../services/ColaboradorService";
import { CriarColaboradorDto } from "../@types/dto/ColaboradorDto";

export const testandoEquipamento = async (connection: Connection) => {
  const tipoEquipamentoRepo = connection.getCustomRepository(
    TipoEquipamentoRepository
  );
  const parametroRepo = connection.getCustomRepository(ParametroRepository);
  const parametroService = new ParametroService(parametroRepo);
  const tipoEquipamentoService = new TipoEquipamentoService(
    tipoEquipamentoRepo
  );
  const equipamentoRepo = connection.getCustomRepository(EquipamentoRepository);
  const equipamentoService = new EquipamentoService(equipamentoRepo);
  const parametro: CriarParametroDto = {
    quantidadeCritica: 1,
    tempoMedioConsumo: 1,
    tempoMedioEnvio: 5,
    tempoMedioReposicao: 2,
  };
  const colaboradorRepo = connection.getCustomRepository(ColaboradorRepository);
  const colaboradorService = new ColaboradorService(colaboradorRepo);
  const colaborador1: CriarColaboradorDto = {
    nome: "gabriel",
    dataInicio: "10/10/2021",
    telefone: "029302902",
    email: "gabrielrarolabs@com",
    endereco: {
      cep: "209302903",
      logradouro: "teste",
      complemento: "teste",
      bairro: "teste",
      localidade: "teste",
      uf: "string",
      numero: "123456",
    },
  };
  const tipoEquipamento: CriarTipoEquipamentoDto = {
    tipo: "notebook",
    modelo: "dell g15",
    quantidade: 10,
    descricao: "testando",
    parametro: parametro,
  };

  const equipamento: CriarEquipamentoDto = {
    lote: "1a3rT5",
    descricao: "macbooks 2019",
    dataAquisicao: new Date(),
    numeroDeSerie: "we93",
    tipoEquipamentoId: 3,
  };

  const equipamento2: CriarEquipamentoDto = {
    lote: "1a3rT2325",
    descricao: "macbooks 2019",
    dataAquisicao: new Date(),
    numeroDeSerie: "we94",
    tipoEquipamentoId: 5,
  };

  // const atualizaEquipamento: AtualizarEquipamentoDto = {
  //   id: 3,
  //   descricao: "sim",
  // };

  // const atualizaTipoEquipamento: AtualizarTipoEquipamentoDto = {
  //   descricao: "ttssse",
  //   //parametro: { quantidadeCritica: 2, tempoMedioConsumo: 4 },
  // };
  // const colaboradorCriado = await colaboradorService.criar(colaborador1);
  // const tipoEquipamentoCriado =
  //   await tipoEquipamentoService.criarTipoEquipamento(tipoEquipamento);
  // const equipamentoCriado = await equipamentoService.criarEquipamento(
  //   equipamento
  // );
  // const equipamentoCriado2 = await equipamentoService.criarEquipamento(
  //   equipamento2
  // );
  // const colaboradorInteiro = await colaboradorRepo.findById(1);
  // colaboradorInteiro.equipamentos = [equipamentoCriado, equipamentoCriado2];
  // await colaboradorRepo.save(colaboradorInteiro);
  //await tipoEquipamentoService.criarTipoEquipamento(tipoEquipamento, parametro);
};

// void (async function () {
//   const conn = await createDatabaseConnection();
//   await testandoEquipamento(conn);
// })();
