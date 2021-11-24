// import {MigrationInterface, QueryRunner} from "typeorm";

// export class adcionandoConstraintDeUniqEmTipoEquipamento1637689421738 implements MigrationInterface {
//     name = 'adcionandoConstraintDeUniqEmTipoEquipamento1637689421738'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE \`endereco\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cep\` varchar(255) NOT NULL, \`logradouro\` varchar(255) NOT NULL, \`complemento\` varchar(255) NOT NULL, \`numero\` int NOT NULL, \`bairro\` varchar(255) NOT NULL, \`estado\` varchar(255) NOT NULL, \`colaboradorId\` int NULL, UNIQUE INDEX \`REL_172b2625739dfaa7edac4c712a\` (\`colaboradorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`parametro\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tempoMedioEnvio\` int NOT NULL, \`tempoMedioConsumo\` int NOT NULL, \`tempoMedioReposicao\` int NOT NULL, \`quantidadeCritica\` int NOT NULL, \`tipoEquipamentoId\` int NULL, UNIQUE INDEX \`REL_c60f84bc5e540b089242b9c990\` (\`tipoEquipamentoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`tipo_equipamento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, \`modelo\` varchar(255) NOT NULL, \`descricao\` varchar(255) NULL, \`quantidade\` int NOT NULL, UNIQUE INDEX \`IDX_88a45b970e37328bcc8824f047\` (\`modelo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`hashSenha\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`movimentacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipoMovimentacao\` enum ('entrada', 'saida', 'envio', 'devolucao') NOT NULL, \`dataMovimentacao\` datetime NOT NULL, \`dataInicio\` datetime NOT NULL, \`dataEntrega\` datetime NULL, \`descricao\` varchar(255) NULL, \`tipoEquipamentoId\` int NULL, \`equipamentoId\` int NULL, \`usuarioId\` int NULL, \`colaboradorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`equipamento\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lote\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, \`numeroDeSerie\` varchar(255) NOT NULL, \`dataAquisicao\` datetime NOT NULL, \`tipoEquipamentoId\` int NULL, \`colaboradorId\` int NULL, UNIQUE INDEX \`IDX_8d499d082ed91bebf5340c2f7b\` (\`numeroDeSerie\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`CREATE TABLE \`colaborador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`telefone\` varchar(255) NOT NULL, \`dataInicio\` datetime NOT NULL, \`dataRecisao\` datetime NULL, UNIQUE INDEX \`IDX_2c7cab1392c28313e5880d941b\` (\`email\`), UNIQUE INDEX \`IDX_345366b7984e8dcdc1ca3bc5b6\` (\`telefone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_172b2625739dfaa7edac4c712ae\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`parametro\` ADD CONSTRAINT \`FK_c60f84bc5e540b089242b9c9901\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_e6648e1434d11eee2dd0ba31e21\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_9cb24bca1d212ecbd4427bf8010\` FOREIGN KEY (\`equipamentoId\`) REFERENCES \`equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_4e7c85732d12ae79aedb54d6023\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_180eaa406520e4e25262dc7a259\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` ADD CONSTRAINT \`FK_8d36f3e052b43d2fdbb20a20091\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` ADD CONSTRAINT \`FK_24374677ab4d001eac3f561b76c\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`equipamento\` DROP FOREIGN KEY \`FK_24374677ab4d001eac3f561b76c\``);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` DROP FOREIGN KEY \`FK_8d36f3e052b43d2fdbb20a20091\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_180eaa406520e4e25262dc7a259\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_4e7c85732d12ae79aedb54d6023\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_9cb24bca1d212ecbd4427bf8010\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_e6648e1434d11eee2dd0ba31e21\``);
//         await queryRunner.query(`ALTER TABLE \`parametro\` DROP FOREIGN KEY \`FK_c60f84bc5e540b089242b9c9901\``);
//         await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_172b2625739dfaa7edac4c712ae\``);
//         await queryRunner.query(`DROP INDEX \`IDX_345366b7984e8dcdc1ca3bc5b6\` ON \`colaborador\``);
//         await queryRunner.query(`DROP INDEX \`IDX_2c7cab1392c28313e5880d941b\` ON \`colaborador\``);
//         await queryRunner.query(`DROP TABLE \`colaborador\``);
//         await queryRunner.query(`DROP INDEX \`IDX_8d499d082ed91bebf5340c2f7b\` ON \`equipamento\``);
//         await queryRunner.query(`DROP TABLE \`equipamento\``);
//         await queryRunner.query(`DROP TABLE \`movimentacao\``);
//         await queryRunner.query(`DROP TABLE \`usuario\``);
//         await queryRunner.query(`DROP INDEX \`IDX_88a45b970e37328bcc8824f047\` ON \`tipo_equipamento\``);
//         await queryRunner.query(`DROP TABLE \`tipo_equipamento\``);
//         await queryRunner.query(`DROP INDEX \`REL_c60f84bc5e540b089242b9c990\` ON \`parametro\``);
//         await queryRunner.query(`DROP TABLE \`parametro\``);
//         await queryRunner.query(`DROP INDEX \`REL_172b2625739dfaa7edac4c712a\` ON \`endereco\``);
//         await queryRunner.query(`DROP TABLE \`endereco\``);
//     }

// }
