import { Inject, Service } from "typedi";
import { IEnviarEmail } from "../@types/clients/IEnviarEmail";
import { TipoEquipamento } from "models/TipoEquipamentoEntity";
import { IEmailService } from "../@types/services/IEmailService";
import { IUsuarioRepository } from "../@types/repositories/IUsuarioRepository";

@Service("EmailService")
export class EmailService implements IEmailService {
  constructor(
    @Inject("EnviarEmail") private emailClient: IEnviarEmail,
    @Inject("UsuarioRepository") private usuarioRepository: IUsuarioRepository
  ) {}

  async alertarQuantidadeCritica(
    tipoEquipamentoAtualizado: TipoEquipamento
  ): Promise<void> {
    if (
      tipoEquipamentoAtualizado.quantidade ===
      tipoEquipamentoAtualizado.parametro.quantidadeCritica
    ) {
      const listaUsuariosAdmin = await this.usuarioRepository.findAdmins();
      const emailsParaEnviar = listaUsuariosAdmin.map((usuarioAdmin) =>
        this.emailClient.enviarEmail(
          usuarioAdmin.email,
          tipoEquipamentoAtualizado.tipo
        )
      );
      await Promise.all(emailsParaEnviar);
    }
    return;
  }
}
