export interface IEnviarEmail {
  enviarEmail(emailTo: string, preenchedor: string): Promise<void>;
}
