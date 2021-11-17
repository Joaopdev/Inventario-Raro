import { Colaborador } from "../../models/ColaboradorEntity";
import { ColaboradorDto } from "../dto/ColaboradorDto";

export interface IColaboradorService {
  listar(): Promise<Colaborador[]>;
  buscar(id: number): Promise<Colaborador>;
  criar(colaboradorDto: ColaboradorDto): Promise<Colaborador>;
  atualizar(id: number, colaboradorDto: ColaboradorDto): Promise<void>;
  remover(id: number): Promise<void>;
}
