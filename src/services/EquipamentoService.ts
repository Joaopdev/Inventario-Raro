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
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Operacao } from "../@types/enums/Operacao";
import { IEnviarEmail } from "../@types/clients/IEnviarEmail";
@Service("EquipamentoService")
export class EquipamentoService implements IEquipamentoService {
  public constructor(
    @Inject("EquipamentoRepository")
    private equipamentoRepository: IEquipamentoRepository,
    @Inject("TipoEquipamentoService")
    private tipoEquipamentoService: ITipoEquipamentoService,
    @Inject("EnviarEmail")
    private enviarEmail: IEnviarEmail
  ) {}

  async criarEquipamento(
    equipamentoDto: CriarEquipamentoDto
  ): Promise<RetornoEquipamentoDto> {
    try {
      const equipamento = equipamentoFactory(equipamentoDto);

      await this.equipamentoRepository.save(equipamento);

      const a =
        await this.tipoEquipamentoService.atualizaQuantidadeTipoEquipamento(
          equipamento.tipoEquipamento.id,
          Operacao.soma
        );
      console.log(a);
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

  async removerEquipamento(id: number): Promise<void> {
    const equipamento = await this.equipamentoRepository.findEquipamento(id);
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

    if (!equipamento) {
      throw new EquipamentoNaoExiste();
    }
    console.log("3");

    await this.equipamentoRepository.remove(equipamento);
  }
}
