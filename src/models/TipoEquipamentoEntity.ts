import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Equipamento } from "./EquipamentoEntity";
import { Movimentacao } from "./MovimentacaoEntity";
import { Parametro } from "./ParametroEntity";

@Entity()
export class TipoEquipamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column({ unique: true })
  modelo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true, default: 0 })
  quantidade: number;

  @OneToMany(() => Equipamento, (equipamento) => equipamento.tipoEquipamento)
  equipamentos: Equipamento[];

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.tipoEquipamento)
  movimentacoes: Movimentacao[];

  @OneToOne(() => Parametro, (parametro) => parametro.tipoEquipamento, {
    nullable: false,
    cascade: true,
    onDelete: "CASCADE",
  })
  parametro: Parametro;
}
