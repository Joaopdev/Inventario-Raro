```ts
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
import { omitTipoEquipamentoDoEquipamento } from "../dataMappers/equipamento/omitTipoEquipamentoDoEquipamento";
import { atualizaEquipamento } from "../dataMappers/equipamento/atualizaEquipamento";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Operacao } from "../@types/enums/Operacao";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { decode } from "jsonwebtoken";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { IEquipamentoRepository } from "../@types/repositories/IEquipamentoRepository";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { IEmailService } from "../@types/services/IEmailService";

@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository,
    @Inject("TipoEquipamentoService")
    private tipoEquipamentoService: ITipoEquipamentoService,
    @Inject("EmailService")
    private emailService: IEmailService,
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

      const tipoEquipamentoAtualizado =
        await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
          equipamento.tipoEquipamento.id,
          Operacao.soma
        );
      equipamento.tipoEquipamento = tipoEquipamentoAtualizado;
      await this.movimentacaoService.geraMovimentacaoEquipamento(
        usuario.id,
        equipamento,
        TipoMovimentacao.Entrada
      );

      return omitTipoEquipamentoDoEquipamento(equipamento);
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
    const equipamentos = await this.equipamentoRepository.findAllEquipamentos();
    return equipamentos.map(omitTipoEquipamentoDoEquipamento);
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

    return omitTipoEquipamentoDoEquipamento(equipamento);
  }

  async inativarEquipamento(authorization: string, id: number): Promise<void> {
    const usuario = decode(authorization) as TokenPayload;

    const equipamento = await this.equipamentoRepository.findEquipamento(id);
    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }

    equipamento.ativo = false;
    await this.movimentacaoService.geraMovimentacaoEquipamento(
      usuario.id,
      equipamento,
      TipoMovimentacao.Saida
    );

    const tipoEquipamento =
      await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
        equipamento.tipoEquipamento.id,
        Operacao.subtracao
      );

    await this.emailService.alertarQuantidadeCritica(tipoEquipamento);
    return;
  }
}

```

```ts
import {
  AtualizarTipoEquipamentoDto,
  CriarTipoEquipamentoDto,
  RetornoCriarTipoEquipamentoDto,
} from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Inject, Service } from "typedi";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";
import { tipoEquipamentoFactory } from "../dataMappers/tipoEquipamento/tipoEquipamentoFactory";
import { omitEquipamentoEMovimentacoesDoTipoEquipamento } from "../dataMappers/tipoEquipamento/omitEquipamentoEMovimentacoesDoTipoEquipamento";
import { TipoEquipamentoNaoExiste } from "../@types/errors/TipoEquipamentoNaoExiste";
import { QueryFailedError } from "typeorm";
import { TipoEquipamentoJaExiste } from "../@types/errors/TipoEquipamentoJaExiste";
import { TypeOrmError } from "../@types/typesAuxiliares/TypeOrmError";
import { atualizaTipoEquipamento } from "../dataMappers/tipoEquipamento/atualizaTipoEquipamento";
import { Operacao } from "../@types/enums/Operacao";
import { IMovimentacaoService } from "../@types/services/IMovimentacaoService";
import { TokenPayload } from "../@types/controllers/TokenPayload";
import { decode } from "jsonwebtoken";
import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { ExitemEquipamentosCadastradosComEsteTipoEquipamento } from "../@types/errors/ExistemEquipamentosCadastradosComEsteTipoEquipamento";

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository,
    @Inject("MovimentacaoService")
    private movimentacaoService: IMovimentacaoService
  ) {}

  public async criarTipoEquipamento(
    token: string,
    tipoEquipamentoDto: CriarTipoEquipamentoDto
  ): Promise<RetornoCriarTipoEquipamentoDto> {
    try {
      const usuario = decode(token) as TokenPayload;
      const tipoEquipamento = tipoEquipamentoFactory(tipoEquipamentoDto);
      const movimentacao =
        this.movimentacaoService.geraMovimentacaoTipoEquipamento(
          usuario.id,
          tipoEquipamento,
          TipoMovimentacao.Entrada
        );
      tipoEquipamento.movimentacoes.push(movimentacao);
      await this.tipoEquipamentoRepository.save(tipoEquipamento);

      return omitEquipamentoEMovimentacoesDoTipoEquipamento(tipoEquipamento);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (errorTypeOrm.driverError.code === TipoEquipamentoJaExiste.CODE) {
          throw new TipoEquipamentoJaExiste();
        }
      }
      throw error;
    }
  }

  async listarTipoEquipamento(): Promise<RetornoCriarTipoEquipamentoDto[]> {
    const listaTipoEquipamento =
      await this.tipoEquipamentoRepository.listarTipoEquipamento();

    return listaTipoEquipamento.map(
      omitEquipamentoEMovimentacoesDoTipoEquipamento
    );
  }

  async buscarTipoEquipamento(id: number): Promise<TipoEquipamento> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamento(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    return tipoEquipamento;
  }

  async buscarTipoEquipamentoComEquipamentos(
    id: number
  ): Promise<TipoEquipamento> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamentoComEquipamentos(
        id
      );

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    return tipoEquipamento;
  }

  async atualizarTipoEquipamento(
    id: number,
    tipoEquipamentoDto: AtualizarTipoEquipamentoDto
  ): Promise<void> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamento(id);

    if (!tipoEquipamento) {
      throw new TipoEquipamentoNaoExiste();
    }

    await this.tipoEquipamentoRepository.save(
      atualizaTipoEquipamento(tipoEquipamento, tipoEquipamentoDto)
    );
    return;
  }

  async removerTipoEquipamento(id: number): Promise<void> {
    try {
      const tipoEquipamento = await this.tipoEquipamentoRepository.findOne(id);

      if (!tipoEquipamento) {
        throw new TipoEquipamentoNaoExiste();
      }
      await this.tipoEquipamentoRepository.remove(tipoEquipamento);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const errorTypeOrm = error as TypeOrmError;
        if (
          errorTypeOrm.driverError.code ===
          ExitemEquipamentosCadastradosComEsteTipoEquipamento.CODE
        ) {
          throw new ExitemEquipamentosCadastradosComEsteTipoEquipamento();
        }
      }
      throw error;
    }
  }

  async atualizaQuantidadeTipoEquipamento(
    id: number,
    operacao: Operacao
  ): Promise<TipoEquipamento> {
    const tipoEquipamento =
      await this.tipoEquipamentoRepository.findTipoEquipamento(id);
    if (operacao === Operacao.soma) {
      tipoEquipamento.quantidade += 1;
      return tipoEquipamento;
    }
    if (operacao === Operacao.subtracao) {
      tipoEquipamento.quantidade -= 1;
      return tipoEquipamento;
    }

    throw new Error("Operacao invalida");
  }
}

```
