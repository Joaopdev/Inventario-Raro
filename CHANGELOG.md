# CHANGELOG INVENTARIO

## UNRELEASED
- Implementação dos models conforme o DER.
- Entity permissão foi alterada para se tornar uma role com enum.
## UNRELEASED 
- criado: a estrutura do colaborador(repository,service, router, controller)
- criada nova propriedade no ColaboradorEntity, @numero:string
- adicionado alguns metodos no repository : save,findByemail,findById,findAll,remove
- adicionado alguns metodos no service : criar, listar, buscar, remover, atualizar
- criado ColaboradorDto
- criado Error para colaborador não encontrado
- criada pasta dataMappers, adicionado ColaboradorFactory



 
Endereco 
 * GET /enderecos/839283 <= consulta um endereco pelo cep

Tipo Equipamentos
 * GET /tipoEquipamentos
 * POST /tipoEquipamentos
 * PATCH /tipoEquipamentos/:id

 Equipamentos
 * GET /Equipamentos => lista
 * GET colaboradores/id/equipamentos => busca os equipamnetos de um determinado colaborador
 * POST /Equipamento => adiciona equipamento
 * PATCH /Equipamento/id/ => atualiza
