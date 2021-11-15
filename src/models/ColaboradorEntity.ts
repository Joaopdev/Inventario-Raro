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
  name: string;

  @Column()
  email: string;

  @Column()
  dataInicio: string;

  @Column({ nullable: true })
  dataRecisao: string;

  @OneToMany(() => Equipamento, (equipamento) => equipamento.colaborador)
  equipamentos: Equipamento[];

  @OneToMany(() => Movimentacao, (movimentaçao) => movimentaçao.colaborador)
  movimentacoes: Movimentacao[];

  @OneToOne(() => Endereco, { cascade: true })
  endreco: Endereco;
}
