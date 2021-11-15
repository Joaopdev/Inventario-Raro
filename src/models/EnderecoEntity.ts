import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Colaborador } from "./ColaboradorEntity";

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  complemento: string;

  @Column()
  numero: string;

  @Column()
  bairro: string;

  @Column()
  estado: string;

  @OneToOne(() => Colaborador)
  @JoinColumn()
  colaborador: Colaborador;
}
