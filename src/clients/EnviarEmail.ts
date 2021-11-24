import * as dotenv from "dotenv";
import * as sgMail from "@sendgrid/mail";
import { EmailNaoEnviado } from "./../@types/errors/EmailNaoEnviado";
import { Mensagem } from "./../@types/clients/TemplateEmail";
import { TemplateEmail } from "../@types/clients/TemplateEmail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class Email {
  private EMAIL_FROM = process.env.SENDGRID_EMAIL_FROM;

  mensagem: Mensagem = {
    to: "ajutram.adv@gmail.com", //usado para testar o recebimento
    from: this.EMAIL_FROM,
    subject: "Atualização do sistema de inventário da Raro Labs",
    html: TemplateEmail,
  }

  async enviarEmail(mensagem: Mensagem): Promise<any> {
    try {
      await sgMail.send(mensagem)
      console.log("E-mail enviado com sucesso");
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        throw new EmailNaoEnviado()
      }
    }
  };
}

