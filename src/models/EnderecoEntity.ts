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
  numero: number;

  @Column()
  bairro: string;

  @Column()
  estado: string;

  @OneToOne(() => Colaborador, (colaborador) => colaborador.endereco, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  colaborador: Colaborador;
}
