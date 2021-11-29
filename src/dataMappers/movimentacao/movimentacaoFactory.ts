import { Colaborador } from "../../models/ColaboradorEntity";
import { Equipamento } from "../../models/EquipamentoEntity";
import { Usuario } from "../../models/UsuarioEntity";
import { Movimentacao } from "../../models/MovimentacaoEntity";
import { CriarMovimentacaoDto } from "../../@types/dto/MovimentacaoDto";

export const movimentacaoFactory = (
  usuarioId: number,
  novaMovimentacao: CriarMovimentacaoDto,
  tipoEquipamentoId?: number,
  equipamento?: Equipamento
): Movimentacao => {
  const usuarioCriado = new Usuario();
  usuarioCriado.id = usuarioId;
  const movimentacao = new Movimentacao();
  movimentacao.dataMovimentacao = new Date();
  movimentacao.tipoMovimentacao = novaMovimentacao.tipoMovimentacao;
  movimentacao.dataEntrega = novaMovimentacao.dataEntrega;
  movimentacao.descricao = novaMovimentacao.descricao;
  movimentacao.usuario = usuarioCriado;
  if (novaMovimentacao.colaboradorId) {
    const colaboradorCriado = new Colaborador();
    colaboradorCriado.id = novaMovimentacao.colaboradorId;
    movimentacao.colaborador = colaboradorCriado;
  }
  if (equipamento) {
    movimentacao.equipamento = equipamento;
    movimentacao.tipoEquipamento = equipamento.tipoEquipamento;
  } else {
    movimentacao.equipamento.id = novaMovimentacao.equipamentoId;
    movimentacao.tipoEquipamento.id = tipoEquipamentoId;
  }

  return movimentacao;
};
