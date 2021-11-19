import { CriarTipoEquipamentoDto } from "../@types/dto/TipoEquipamentoDto";
import { TipoEquipamento } from "../models/TipoEquipamentoEntity";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";
import { Inject, Service } from "typedi";
import { ITipoEquipamentoRepository } from "../@types/repositories/ITipoEquipamentoRepository";
import { CriarParametroDto } from "../@types/dto/ParametroDto";
import { Parametro } from "../models/ParametroEntity";

@Service("TipoEquipamentoService")
export class TipoEquipamentoService implements ITipoEquipamentoService {
  public constructor(
    @Inject("TipoEquipamentoRepository")
    private tipoEquipamentoRepository: ITipoEquipamentoRepository
  ) {}
  public async criarTipoEquipamento(
    tipoEquipamentoDto: CriarTipoEquipamentoDto,
    parametroDto: CriarParametroDto
  ): Promise<TipoEquipamento> {
    const tipoEquipamento = this.tipoEquipamentoFactory(
      tipoEquipamentoDto,
      parametroDto
    );
    const resultado = await this.tipoEquipamentoRepository.save(
      tipoEquipamento
    );
    return resultado;
  }
  async listarTipoEquipamento(): Promise<TipoEquipamento[]> {
    return await this.tipoEquipamentoRepository.find();
  }

  async removerTipoEquipamento(id: number): Promise<void> {
    const tipoEquipamentoParaRemover =
      await this.tipoEquipamentoRepository.findOne(id);
    if (!tipoEquipamentoParaRemover) {
      throw new Error("tipo equipamento nao existe");
    }
    await this.tipoEquipamentoRepository.remove(tipoEquipamentoParaRemover);
  }

  private tipoEquipamentoFactory(
    tipoEquipamentoDto: CriarTipoEquipamentoDto,
    parametroDto: CriarParametroDto
  ): TipoEquipamento {
    const tipoEquipamento = new TipoEquipamento();
    tipoEquipamento.tipo = tipoEquipamentoDto.tipo;
    tipoEquipamento.modelo = tipoEquipamentoDto.modelo;
    tipoEquipamento.quantidade = tipoEquipamentoDto.quantidade;
    tipoEquipamento.descricao = tipoEquipamentoDto.descricao;
    tipoEquipamento.parametro = this.parametroFactory(parametroDto);
    return tipoEquipamento;
  }

  private parametroFactory(parametroDto: CriarParametroDto): Parametro {
    const parametro = new Parametro();
    parametro.quantidadeCritica = parametroDto.quantidadeCritica;
    parametro.tempoMedioConsumo = parametroDto.tempoMedioConsumo;
    parametro.tempoMedioEnvio = parametroDto.tempoMedioEnvio;
    parametro.tempoMedioReposicao = parametroDto.tempoMedioReposicao;
    return parametro;
  }
}
