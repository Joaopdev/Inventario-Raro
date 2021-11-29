export type Mensagem = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

export const TemplateEmail = `
  <h1> Informações sobre o estoque dos equipamentos da Raro Labs. </h1>
  <h2> O estoque do equipamento PLACEHOLDER atingiu o nível crítico. </h2>`;
