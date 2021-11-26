import { Inject, Service } from "typedi";
import { IEnviarEmail } from "../@types/clients/IEnviarEmail";
import { TipoEquipamento } from "models/TipoEquipamentoEntity";
import { IEmailService } from "../@types/services/IEmailService";

@Service("EmailService")
export class EmailService implements IEmailService {
  constructor(@Inject("EnviarEmail") private emailClient: IEnviarEmail) {}

  async alertarQuantidadeCritica(
    tipoEquipamentoAtualizado: TipoEquipamento
  ): Promise<void> {
    if (
      tipoEquipamentoAtualizado.quantidade ===
      tipoEquipamentoAtualizado.parametro.quantidadeCritica
    ) {
      await this.emailClient.enviarEmail(tipoEquipamentoAtualizado.modelo);
    }
    return;
  }
}
