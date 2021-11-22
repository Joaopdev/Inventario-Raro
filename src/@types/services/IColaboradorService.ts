import {
  AlterarColaboradorDto,
  ColaboradorDto,
  ColaboradorTratado,
} from "../dto/ColaboradorDto";

export interface IColaboradorService {
  listar(): Promise<ColaboradorTratado[]>;
  buscar(id: number): Promise<ColaboradorTratado>;
  criar(colaboradorDto: ColaboradorDto): Promise<ColaboradorTratado>;
  atualizar(
    id: number,
    colaboradorDtoAtualizado: AlterarColaboradorDto
  ): Promise<ColaboradorTratado>;
  remover(id: number): Promise<void>;
}
