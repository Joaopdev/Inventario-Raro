export interface IEnviarEmail {
  enviarEmail(preenchedor: string): Promise<void>;
}
