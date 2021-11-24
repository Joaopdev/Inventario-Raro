import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoEquipamento } from "./TipoEquipamentoEntity";

@Entity()
export class Parametro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tempoMedioEnvio: number;

  @Column()
  tempoMedioConsumo: number;

  @Column()
  tempoMedioReposicao: number;

  @Column()
  quantidadeCritica: number;

  @OneToOne(
    () => TipoEquipamento,
    (tipoEquipamento) => tipoEquipamento.parametro,
    { onDelete: "CASCADE", nullable: false }
  )
  @JoinColumn()
  tipoEquipamento: TipoEquipamento;
}
