# Changelog
## [1.1.1] - 2021-12-01

### Added
- Adicionado a documentação o link do diagrama de relações.

### Changed
- responsabilidade por enviar email a respeito da quantidade critica saiu da movimentacao de devolucao e foi para o colaborador no gera movimentação.

### Fixed 
- correção do metodo de gerar movimentacao na devolucao, caso o email falhasse nada estava sendo salvo, o envio do equipamento não acontecia.
- correção no teste do service de endereço.
- correção do erro caso o email nao seja enviado, retornar 200 pois a ação de enviar o equipamento aconteceu, apenas alguns remetentes nao receberam o email por serem falsos.

## [1.1.0] - 2021-12-01

### Added
- Metodo inativar para o tipo Equipamento service e assim garantir que nenhum log de movimentação se perca, não é possivel inativa-lo caso equipamentos com seu tipo estejam ativos.
- Metodo de busca por equipamentos com todas suas relations, implementado no repository.
- testes unitários para o colaborador Service.
- testes unitários para o TipoEquipamento Service.
- Error implementado para caso o Envio de email não ocorra.
- Error implementado para caso o tipoEquipamento não possa ser inativado.
- Error implementado para caso a role do usuario seja passada de forma errada.

### Changed

-Novo link: [swagger](https://app.swaggerhub.com/apis-docs/grupo_undefined/Projeto-Inventario-Raro-Academy/1.1.0)

- Usuario
    - Router
        - correção nas rotas por conta do middleware de autenticação.

- Colaborador    
    - Service
        - Refatorado buscando otimizar o tempo de processamento na hora de criar movimentações de envio e devolução.

- Movimentacao    
    - Service
        - Implementados 2 metodos, criaMovimentacaoEnvio e criaMovimentacaoDevolucao utilizados para serem salvos dentro do colaborador.
        - metodos criaMovimentacaoTipoEquipamento e criaMovimentacaoTipoEquipamento agora utilizam o factory de movimentacao
        
- Tipo Equipamento    
    - Service
        - Metodo remover substituido pelo inativar.
        - Refatorado buscando otimizar o tempo de processamento na hora de criar e inativar.
    - Repository
        - metodos de buscas alterados para filtrar os equipamentos ativados

- Equipamento 
    - Service
        - Refatorado buscando otimizar o tempo de processamento na hora de criar e inativar.
 


### Fixed

- error dos response melhorados.
- operacoes no banco reduzidas para os services : colaborador, movimentacao, equipamento e tipoEQuipamento.
- requisições de patch e delete no usuario corrigidas.

## [1.0.0] - 2021-11-29

### Added
- [swagger](https://app.swaggerhub.com/apis-docs/grupo_undefined/Projeto-Inventario-Raro-Academy/1.0.0)
- novo helper, validação de email, garantir que o colaborador e usuario não passem um email inválido.
- novos erros no service de colaborador.
- novos erros no service de equipmanetos e tipoEquipamentos.
- nova propriedade para Equipamento e TipoEquipamento: ativo.
- novo erro para flag de movimentação (tipoMovimentação)

### Changed
- Envio de email
    - Desacoplado o client de email dos services e criado um novo service para email.
    - Envio de email para todos os administradores ao inves de enviar para um só.

- Colaborador    
    - Service
        - Atribuida a responsabilidade de criar a movimentação de envio/devolução.
        - Metodo inativar implementado, consiste em adicionar a data de recisão do colaborador
    - Repository
        - Buscas filtrando colaboradores que nao possuem data de recisão.

- Equipamento    
    - Service
        - Metodo inativar implementado, consiste em alterar a flag da propriedade ativo (deletar lógico)
    - Repository
        - Buscas filtrando equipamentos que estão ativos.


### Fixed

- Devolução dos ids das entidades por parte do backend para evitar futuro comprometimento do trabalho do front.
- Omissão da senha do usuario na hora de cria-lo.
- Devolucao de equipamento só pode ser feita caso o colaborador o possua.
- Envio de equipamento, só de pode ser feita se ele estiver disponivel para envio, isto é, não estar registrado a outro colaborador.
