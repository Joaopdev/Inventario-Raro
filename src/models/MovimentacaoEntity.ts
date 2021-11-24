import { TipoMovimentacao } from "../@types/enums/TipoMovimentacao";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colaborador } from "./ColaboradorEntity";
import { Equipamento } from "./EquipamentoEntity";
import { TipoEquipamento } from "./TipoEquipamentoEntity";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: TipoMovimentacao })
  tipoMovimentacao: TipoMovimentacao;

  @Column()
  dataMovimentacao: Date;

  @Column()
  dataInicio: Date;

  @Column({ nullable: true })
  dataEntrega?: Date;

  @Column({ nullable: true })
  descricao?: string;

  @ManyToOne(
    () => TipoEquipamento,
    (tipoEquipamento) => tipoEquipamento.movimentacoes
  )
  tipoEquipamento: TipoEquipamento;

  @ManyToOne(() => Equipamento, (Equipamento) => Equipamento.movimentacoes)
  equipamento: Equipamento;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimentacoes, {
    nullable: false,
  })
  usuario: Usuario;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.movimentacoes)
  colaborador: Colaborador;
}
