import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";

export interface ITipoEquipamentoRepository {
  save(tipoEquipamento: TipoEquipamento): Promise<TipoEquipamento>;
  find(): Promise<TipoEquipamento[]>;
  findOne(id: number): Promise<TipoEquipamento>;
  findTipoEquipamento(id: number): Promise<TipoEquipamento>;
  findTipoEquipamentoComEquipamentos(id: number): Promise<TipoEquipamento>;
  remove(
    tipoEquipamento: TipoEquipamento | TipoEquipamento[]
  ): Promise<TipoEquipamento[]>;
}
