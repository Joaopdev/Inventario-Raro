import * as faker from "faker";
import { UsuarioService } from "../UsuarioService";
import { UsuarioDto } from "../../@types/dto/UsuarioDto";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { Usuario } from "../../models/UsuarioEntity";
import { Role } from "../../@types/enums/Role";

describe("UserService", () => {
  let usuarioDto: UsuarioDto;
  let usuarioRepository: UsuarioRepository;
  let userService: UsuarioService;

  beforeEach(jest.clearAllMocks);
  beforeEach(() => {
    usuarioDto = {
      id: faker.datatype.number(),
      nome: faker.name.findName(),
      senha: faker.internet.password(),
      email: faker.internet.email(),
      role: Role.Admin,
    };
    usuarioRepository = new UsuarioRepository();
    userService = new UsuarioService(usuarioRepository);
  });

  describe("list", () => {
    it("deve listar os usuarios", async () => {
      jest.spyOn(usuarioRepository, "find").mockResolvedValue(null);
      await userService.listar();

      expect(void usuarioRepository.find).toHaveBeenCalled();
    });
  });

  describe("buscar", () => {
    it("deve buscar os usuarios", async () => {
      const id = faker.datatype.number();
      jest.spyOn(usuarioRepository, "findOne").mockResolvedValue(null);
      await userService.buscar(id);

      expect(void usuarioRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("criar", () => {
    it("deve criar um novo usuario", async () => {
      jest.spyOn(usuarioRepository, "save").mockResolvedValue(null);
      await userService.criar(usuarioDto);
      expect(void usuarioRepository.save).toHaveBeenCalledWith(usuarioDto);
    });
  });

  describe("atualizar", () => {
    it("deve atualizar um usuario", async () => {
      const id = faker.datatype.number();
      jest.spyOn(usuarioRepository, "save").mockResolvedValue(null);
      await userService.atualizar(id, usuarioDto);
      expect(void usuarioRepository.save).toHaveBeenCalledWith({
        ...usuarioDto,
        id,
      });
    });
  });

  describe("remover", () => {
    it("deve remover um usuario", async () => {
      const id = faker.datatype.number();
      const usuario = new Usuario();
      usuario.nome = usuarioDto.nome;
      usuario.email = usuarioDto.email;
      usuario.hashSenha = usuarioDto.email;

      jest.spyOn(usuarioRepository, "findOne").mockResolvedValue(usuario);
      jest.spyOn(usuarioRepository, "remove").mockResolvedValue(null);
      await userService.remover(id);

      expect(void usuarioRepository.findOne).toHaveBeenCalledWith(id);
      expect(void usuarioRepository.remove).toHaveBeenCalledWith(usuarioDto);
    });

    it("deve lançar um erro se o usuário nao for encontrado", async () => {
      const id = faker.datatype.number();
      jest.spyOn(usuarioRepository, "findOne").mockResolvedValue(null);
      jest.spyOn(usuarioRepository, "remove").mockResolvedValue(null);

      await expect(userService.remover(id)).rejects.toThrow(
        new Error("User not found!")
      );
      expect(void usuarioRepository.findOne).toHaveBeenCalledWith(id);
      expect(void usuarioRepository.remove).not.toHaveBeenCalledWith();
    });
  });
});
