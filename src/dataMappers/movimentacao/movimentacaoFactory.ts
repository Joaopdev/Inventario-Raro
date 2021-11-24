import { Colaborador } from "../../models/ColaboradorEntity";
import { Equipamento } from "../../models/EquipamentoEntity";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { Usuario } from "../../models/UsuarioEntity";
import { CriarMovimentacaoDto } from "../../@types/dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";

export const movimentacaoFactory = (
  novaMovimentacao: CriarMovimentacaoDto
): Movimentacao => {
  const tipoEquipamentoCriado = new TipoEquipamento();
  tipoEquipamentoCriado.id = novaMovimentacao.tipoEquipamento.id;
  const equipamentoCriado = new Equipamento();
  equipamentoCriado.id = novaMovimentacao.equipamento.id;
  const usuarioCriado = new Usuario();
  usuarioCriado.id = novaMovimentacao.usuario.id;
  const movimentacao = new Movimentacao();
  if (novaMovimentacao.colaborador) {
    const colaboradorCriado = new Colaborador();
    colaboradorCriado.id = novaMovimentacao.colaborador.id;
    movimentacao.colaborador = colaboradorCriado;
  }
  movimentacao.tipoMovimentacao = novaMovimentacao.tipoMovimentacao;
  movimentacao.dataMovimentacao = new Date(novaMovimentacao.dataMovimentacao);
  movimentacao.dataInicio = new Date(novaMovimentacao.dataInicio);
  movimentacao.dataEntrega = novaMovimentacao.dataEntrega;
  movimentacao.descricao = novaMovimentacao.descricao;
  movimentacao.tipoEquipamento = tipoEquipamentoCriado;
  movimentacao.equipamento = equipamentoCriado;
  movimentacao.usuario = usuarioCriado;
  return movimentacao;
};
