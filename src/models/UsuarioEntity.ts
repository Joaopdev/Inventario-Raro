import { Role } from "../@types/enums/Role";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Movimentacao } from "./MovimentacaoEntity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  hashSenha: string;

  @Column({ type: "enum", enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => Movimentacao, (movimentaçao) => movimentaçao.usuario)
  movimentacoes: Movimentacao[];
}
