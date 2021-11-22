import * as dotenv from "dotenv";
import * as sgMail from "@sendgrid/mail";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mensagem = {
  to: "ajutram.adv@gmail.com",
  from: "jpsilva.dev@gmail.com",
  subject: "Testando e-mail com sendgrid",
  text: "teste de e-mail com sendgrid",
  html: "<h2> O campo html substitui o texto na tag text</h2>",
};

export const enviarEmail = void (async () => {
  try {
    await sgMail.send(mensagem);
    console.log("E-mail enviado com sucesso!!!");
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
})();