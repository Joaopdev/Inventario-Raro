import * as dotenv from "dotenv";
import * as sgMail from "@sendgrid/mail";
import { EmailNaoEnviado } from "./../@types/errors/EmailNaoEnviado";
import { Mensagem } from "./../@types/clients/TemplateEmail";
import { TemplateEmail } from "../@types/clients/TemplateEmail";
import { IEnviarEmail } from "../@types/clients/IEnviarEmail";
import { Service } from "typedi";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Service("EnviarEmail")
export class EnviarEmail implements IEnviarEmail {
  private EMAIL_FROM = process.env.SENDGRID_EMAIL_FROM;

  async enviarEmail(preenchedor: string): Promise<void> {
    try {
      const mensagem: Mensagem = {
        to: process.env.SENDGRID_EMAIL_TO,
        from: this.EMAIL_FROM,
        subject: "Atualização do sistema de inventário da Raro Labs",
        html: TemplateEmail.replace("PLACEHOLDER", `${preenchedor}`),
      };
      await sgMail.send(mensagem);
    } catch (error) {
      if (error instanceof Error) {
        throw new EmailNaoEnviado();
      }
    }
  }
}
