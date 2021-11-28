import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Colaborador } from "./ColaboradorEntity";
import { Movimentacao } from "./MovimentacaoEntity";
import { TipoEquipamento } from "./TipoEquipamentoEntity";

@Entity()
export class Equipamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lote: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ unique: true })
  numeroDeSerie: string;

  @Column()
  dataAquisicao: Date;

  @Column({ default: true })
  ativo: boolean;

  @ManyToOne(
    () => TipoEquipamento,
    (tipoEquipamento) => tipoEquipamento.equipamentos,
    { nullable: false }
  )
  tipoEquipamento: TipoEquipamento;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.equipamentos)
  colaborador: Colaborador;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.equipamento, {
    onDelete: "CASCADE",
    cascade: true,
  })
  movimentacoes: Movimentacao[];
}
