import { TipoEquipamento } from "models/TipoEquipamentoEntity";

export interface IEmailService {
  alertarQuantidadeCritica(tipoEquipamento: TipoEquipamento): Promise<void>;
}
