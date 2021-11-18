import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { IColaboradorService } from "../@types/services/IColaboradorService";

@Service("ColaboradorController")
export class ColaboradorController {
  constructor(
    @Inject("Colaborador") private enderecoService: IColaboradorService
  ) {}
}
