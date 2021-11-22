import {
  AlteraColaboradorDto,
  ColaboradorDto,
  ColaboradorTratado,
} from "../dto/ColaboradorDto";

export interface IColaboradorService {
  listar(): Promise<ColaboradorTratado[]>;
  buscar(id: number): Promise<ColaboradorTratado>;
  criar(colaboradorDto: ColaboradorDto): Promise<ColaboradorTratado>;
  atualizar(
    id: number,
    colaboradorDtoAtualizado: AlteraColaboradorDto
  ): Promise<ColaboradorTratado>;
  remover(id: number): Promise<void>;
}
