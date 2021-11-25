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
import { Equipamento } from "../models/EquipamentoEntity";
import { Usuario } from "../models/UsuarioEntity";
import { Movimentacao } from "../models/MovimentacaoEntity";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { IMovimentacaoRepository } from "../@types/repositories/IMovimentacaoRepository";
import { decode } from "jsonwebtoken";
import { TokenPayload } from "../@types/controllers/TokenPayload";
@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository,
    @Inject("MovimentacaoRepository")
    private movimentacaoRepository: IMovimentacaoRepository
  ) {}

  async criarEquipamento(
    authorization: string,
    equipamentoDto: CriarEquipamentoDto
  ): Promise<RetornoEquipamentoDto> {
    try {
      console.log(equipamentoDto);
      const equipamento = equipamentoFactory(equipamentoDto);
      const usuario = decode(authorization) as TokenPayload;
      console.log("USUARIO", usuario);
      const equipamentoSalvo = await this.equipamentoRepository.save(
        equipamento
      );
      console.log("salvou o equipamento", equipamentoSalvo);

      await this.geraMovimentacao(
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
    await this.geraMovimentacao(
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

  private async geraMovimentacao(
    usuarioId: number,
    equipamento: Equipamento,
    tipoMovimentacao: TipoMovimentacao
  ): Promise<void> {
    const usuarioResposanvel = new Usuario();
    usuarioResposanvel.id = usuarioId;
    const movimentacao = new Movimentacao();
    movimentacao.usuario = usuarioResposanvel;
    movimentacao.tipoEquipamento = equipamento.tipoEquipamento;
    movimentacao.equipamento = equipamento;
    movimentacao.dataInicio = equipamento.dataAquisicao;
    movimentacao.dataMovimentacao = new Date();
    movimentacao.tipoMovimentacao = tipoMovimentacao;
    await this.movimentacaoRepository.save(movimentacao);
    return;
  }
}
