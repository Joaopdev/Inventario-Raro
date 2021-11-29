import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Endereco } from "./EnderecoEntity";
import { Equipamento } from "./EquipamentoEntity";
import { Movimentacao } from "./MovimentacaoEntity";

@Entity()
export class Colaborador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  telefone: string;

  @Column()
  dataInicio: Date;

  @Column({ nullable: true })
  dataRecisao: Date;

  @OneToMany(() => Equipamento, (equipamento) => equipamento.colaborador, {
    cascade: true,
  })
  equipamentos: Equipamento[];

  @OneToMany(() => Movimentacao, (movimentaçao) => movimentaçao.colaborador)
  movimentacoes: Movimentacao[];

  @OneToOne(() => Endereco, (endereco) => endereco.colaborador, {
    cascade: true,
  })
  endereco: Endereco;
}
