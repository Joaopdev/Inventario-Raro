import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Endereco } from "./EnderecoEntity";
import { Equipamento } from "./EquipamentoEntity";
import { Movimentacao } from "./MovimentaçaoEntity";

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  dataInicio: Date;

  @Column({ nullable: true })
  dataRecisao: Date;

  @OneToMany(() => Equipamento, (equipamento) => equipamento.colaborador)
  equipamentos: Equipamento[];

  @OneToMany(() => Movimentacao, (movimentaçao) => movimentaçao.colaborador)
  movimentacoes: Movimentacao[];

  @OneToOne(() => Endereco, { cascade: true })
  endreco: Endereco;
}
