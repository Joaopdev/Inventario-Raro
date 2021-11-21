import { TipoEquipamentoRepository } from "../repositories/TipoEquipamentoRepository";
import { Connection } from "typeorm";
import { TipoEquipamentoService } from "../services/TipoEquipamentoService";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { Parametro } from "../models/ParametroEntity";
import { Equipamento } from "../models/EquipamentoEntity";
import { CriarTipoEquipamentoDto } from "../@types/dto/TipoEquipamentoDto";
import { CriarParametroDto } from "../@types/dto/ParametroDto";
import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
} from "../@types/dto/EquipamentoDto";
import { ParametroService } from "../services/ParametroService";
import { ParametroRepository } from "../repositories/ParametroRepository";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository";
import { EquipamentoService } from "../services/EquipamentoService";

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
    tipoEquipamentoId: 6,
  };

  const atualizaEquipamento: AtualizarEquipamentoDto = {
    id: 3,
    descricao: "sim",
  };

  // await tipoEquipamentoService.criarTipoEquipamento(tipoEquipamento, parametro);
  //await tipoEquipamentoService.criarTipoEquipamento(tipoEquipamento, parametro);
  const a = await tipoEquipamentoService.criarTipoEquipamento(tipoEquipamento);
  console.log(a);
};
