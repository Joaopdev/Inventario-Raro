import { Colaborador } from "../../models/ColaboradorEntity";
import { AlteraColaboradorDto, ColaboradorDto } from "../dto/ColaboradorDto";

export interface IColaboradorService {
  listar(): Promise<Colaborador[]>;
  buscar(id: number): Promise<Colaborador>;
  criar(colaboradorDto: ColaboradorDto): Promise<Colaborador>;
  atualizar(
    id: number,
    colaboradorDtoAtualizado: AlteraColaboradorDto
  ): Promise<void>;
  remover(id: number): Promise<void>;
}
