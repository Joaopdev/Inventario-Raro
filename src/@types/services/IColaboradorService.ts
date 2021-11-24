import {
  AlterarColaboradorDto,
  ColaboradorDto,
  RetornoColaboradorCriadoDto,
} from "../dto/ColaboradorDto";

export interface IColaboradorService {
  listar(): Promise<RetornoColaboradorCriadoDto[]>;
  buscar(id: number): Promise<RetornoColaboradorCriadoDto>;
  criar(colaboradorDto: ColaboradorDto): Promise<RetornoColaboradorCriadoDto>;
  atualizar(
    id: number,
    colaboradorDtoAtualizado: AlterarColaboradorDto
  ): Promise<RetornoColaboradorCriadoDto>;
  remover(id: number): Promise<void>;
}
