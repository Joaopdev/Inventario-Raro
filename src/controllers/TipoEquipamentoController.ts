import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ITipoEquipamentoService } from "../@types/services/ITipoEquipamentoService";

@Service("TipoEquipamentoController")
export class TipoEquipamentoController {
  constructor(
    @Inject("TipoEquipamentoService")
    private tipoEquipamentoService: ITipoEquipamentoService
  ) {}

  async listar(req: Request, res: Response): Promise<void> {
    const tipoEquipamentos =
      await this.tipoEquipamentoService.listarTipoEquipamento();
    res.send(tipoEquipamentos).status(200);
  }
}
