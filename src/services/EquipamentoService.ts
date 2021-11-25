import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
  RetornoEquipamentoDto,
} from "../@types/dto/EquipamentoDto";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { Service, Inject } from "typedi";
import { equipamentoFactory } from "../dataMappers/equipamento/equipamentoFactory";
import { QueryFailedError } from "typeorm";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { EquipamentoJaExiste } from "../@types/errors/EquipamentoJaExiste";
import { EquipamentoNaoExiste } from "../@types/errors/EquipamentoNaoExiste";
import { omitTipoEquipamentoEIdEquipamento } from "../dataMappers/equipamento/omitTipoEquipamentoEIdEquipamento";
import { atualizaEquipamento } from "../dataMappers/equipamento/atualizaEquipamento";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Operacao } from "../@types/enums/Operacao";
import { IEnviarEmail } from "../@types/clients/IEnviarEmail";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { decode } from "jsonwebtoken";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";

@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository,
    @Inject("TipoEquipamentoService")
    private tipoEquipamentoService: ITipoEquipamentoService,
    @Inject("EnviarEmail")
    private enviarEmail: IEnviarEmail,
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService
  ) {}

  async criarEquipamento(
    authorization: string,
    equipamentoDto: CriarEquipamentoDto
  ): Promise<RetornoEquipamentoDto> {
    try {
      const equipamento = equipamentoFactory(equipamentoDto);
      const usuario = decode(authorization) as TokenPayload;
      const movimentacao =
        await this.movimentacaoService.geraMovimentacaoEquipamento(
          usuario.id,
          equipamento,
          TipoMovimentacao.Entrada
        );
      equipamento.movimentacoes.push(movimentacao);
      await this.equipamentoRepository.save(equipamento);

      await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
        equipamento.tipoEquipamento.id,
        Operacao.soma
      );

      return omitTipoEquipamentoEIdEquipamento(equipamento);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === EquipamentoJaExiste.CODE) {
          throw new EquipamentoJaExiste();
        }

        if (errorTypeOrm.driverError.code === "ER_NO_REFERENCED_ROW_2") {
          throw new TipoEquipamentoNaoExiste();
        }
      }
      throw error;
    }
  }

  async listarEquipamentos(): Promise<RetornoEquipamentoDto[]> {
    const equipamentos = await this.equipamentoRepository.find();
    return equipamentos.map(omitTipoEquipamentoEIdEquipamento);
  }

  async atualizarEquipamento(
    id: number,
    equipamentoDto: AtualizarEquipamentoDto
  ): Promise<void> {
    const equipamento = await this.equipamentoRepository.findOne(id);

    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
    const equipamentoAtualizado = atualizaEquipamento(
      equipamento,
      equipamentoDto
    );

    await this.equipamentoRepository.save(equipamentoAtualizado);
    return;
  }

  async buscarEquipamento(id: number): Promise<RetornoEquipamentoDto> {
    const equipamento = await this.equipamentoRepository.findOne(id);

    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }

    return omitTipoEquipamentoEIdEquipamento(equipamento);
  }

  async suspenderEquipamento(authorization: string, id: number): Promise<void> {
    const equipamento = await this.equipamentoRepository.findOne(id);
    const usuario = decode(authorization) as TokenPayload;
    await this.movimentacaoService.geraMovimentacaoEquipamento(
      usuario.id,
      equipamento,
      TipoMovimentacao.Saida
    );
    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
  }
  async removerEquipamento(id: number): Promise<void> {
    const equipamento = await this.equipamentoRepository.findEquipamento(id);
    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
    const tipoEquipamento =
      await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
        equipamento.tipoEquipamento.id,
        Operacao.subtracao
      );
    if (
      tipoEquipamento.quantidade ===
      equipamento.tipoEquipamento.parametro.quantidadeCritica
    ) {
      await this.enviarEmail.enviarEmail(tipoEquipamento.modelo);
    }

    await this.equipamentoRepository.remove(equipamento);
    return;
  }
}
