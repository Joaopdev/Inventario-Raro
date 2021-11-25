import { Colaborador } from "../../models/ColaboradorEntity";
import { Equipamento } from "../../models/EquipamentoEntity";
import { TipoEquipamento } from "../../models/TipoEquipamentoEntity";
import { Usuario } from "../../models/UsuarioEntity";
import { CriarMovimentacaoDto } from "../../@types/dto/MovimentacaoDto";
import { Movimentacao } from "../../models/MovimentacaoEntity";

export const movimentacaoFactory = (
  usuarioId: number,
  novaMovimentacao: CriarMovimentacaoDto
): Movimentacao => {
  const tipoEquipamentoCriado = new TipoEquipamento();
  tipoEquipamentoCriado.id = novaMovimentacao.equipamento.tipoEquipamentoId;
  const equipamentoCriado = new Equipamento();
  equipamentoCriado.id = novaMovimentacao.equipamento.id;
  const usuarioCriado = new Usuario();
  usuarioCriado.id = usuarioId;
  const colaboradorCriado = new Colaborador();
  colaboradorCriado.id = novaMovimentacao.colaboradorId;
  const movimentacao = new Movimentacao();
  movimentacao.colaborador = colaboradorCriado;
  movimentacao.tipoMovimentacao = novaMovimentacao.tipoMovimentacao;
  movimentacao.dataMovimentacao = new Date();
  movimentacao.dataEntrega = novaMovimentacao.dataEntrega;
  movimentacao.descricao = novaMovimentacao.descricao;
  movimentacao.tipoEquipamento = tipoEquipamentoCriado;
  movimentacao.equipamento = equipamentoCriado;
  movimentacao.usuario = usuarioCriado;
  return movimentacao;
};
