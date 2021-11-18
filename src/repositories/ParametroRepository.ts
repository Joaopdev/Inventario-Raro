import { IParametroRepository } from "../@types/repositories/IParametroRepository";
import { Parametro } from "../models/ParametroEntity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Parametro)
export class ParametroRepository
  extends Repository<Parametro>
  implements IParametroRepository {}
