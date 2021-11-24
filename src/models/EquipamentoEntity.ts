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

  @ManyToOne(
    () => TipoEquipamento,
    (tipoEquipamento) => tipoEquipamento.equipamentos
  )
  tipoEquipamento: TipoEquipamento;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.equipamentos)
  colaborador: Colaborador;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.equipamento)
  movimentacoes: Movimentacao[];
}
