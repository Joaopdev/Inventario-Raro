import {
  AtualizarEquipamentoDto,
  CriarEquipamentoDto,
  RetornoEquipamentoDto,
} from "../@types/dto/EquipamentoDto";
import { IEquipamentoService } from "../@types/services/IEquipamentoService";
import { Service, Inject } from "typedi";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { equipamentoFactory } from "../dataMappers/equipamento/equipamentoFactory";
import { QueryFailedError } from "typeorm";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { EquipamentoJaExiste } from "../@types/errors/EquipamentoJaExiste";
import { EquipamentoNaoExiste } from "../@types/errors/EquipamentoNaoExiste";
import { omitTipoEquipamentoEIdEquipamento } from "../dataMappers/equipamento/omitTipoEquipamentoEIdEquipamento";
import { atualizaEquipamento } from "../dataMappers/equipamento/atualizaEquipamento";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { decode } from "jsonwebtoken";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository,
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService
  ) {}

  async criarEquipamento(
    authorization: string,
    equipamentoDto: CriarEquipamentoDto
  ): Promise<RetornoEquipamentoDto> {
    try {
      console.log(equipamentoDto);
      const equipamento = equipamentoFactory(equipamentoDto);
      const usuario = decode(authorization) as TokenPayload;
      const equipamentoSalvo = await this.equipamentoRepository.save(
        equipamento
      );

      await this.movimentacaoService.geraMovimentacaoEquipamento(
        usuario.id,
        equipamentoSalvo,
        TipoMovimentacao.Entrada
      );

      return omitTipoEquipamentoEIdEquipamento(equipamento);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === EquipamentoJaExiste.CODE) {
          throw new EquipamentoJaExiste();
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
    const equipamento = await this.equipamentoRepository.findOne(id);
    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
    await this.equipamentoRepository.remove(equipamento);
    return;
  }
}
