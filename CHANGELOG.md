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
