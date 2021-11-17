import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { ColaboradorRepository } from "repositories/ColaboradorRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UserController";
import "../../controllers/EnderecoController";
import "../../controllers/ColaboradorController";

// inicializa services
import "../../services/UserService";
import "../../services/EnderecoService";
import "../../services/ColaboradorService";
// inicializa clientes
import "../../clients/CepClient";
import "../../infra/http/AxiosHttpClient";

const createDependencyInjector = (): void => {
  Container.set("UsuarioRepository", getCustomRepository(UsuarioRepository));
  Container.set(
    "ColaboradorRepository",
    getCustomRepository(ColaboradorRepository)
  );
};

export default createDependencyInjector;
