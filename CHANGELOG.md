# Changelog

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