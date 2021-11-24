// import {MigrationInterface, QueryRunner} from "typeorm";

// export class AdcionadoAConstraintOnDeleteNasEntidades1637561914460 implements MigrationInterface {
//     name = 'AdcionadoAConstraintOnDeleteNasEntidades1637561914460'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_172b2625739dfaa7edac4c712ae\``);
//         await queryRunner.query(`ALTER TABLE \`parametro\` DROP FOREIGN KEY \`FK_c60f84bc5e540b089242b9c9901\``);
//         await queryRunner.query(`ALTER TABLE \`endereco\` DROP COLUMN \`numero\``);
//         await queryRunner.query(`ALTER TABLE \`endereco\` ADD \`numero\` int NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`parametro\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`tipo_equipamento\` CHANGE \`descricao\` \`descricao\` varchar(255) NULL`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_e6648e1434d11eee2dd0ba31e21\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_9cb24bca1d212ecbd4427bf8010\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_4e7c85732d12ae79aedb54d6023\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` DROP FOREIGN KEY \`FK_180eaa406520e4e25262dc7a259\``);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`dataEntrega\` \`dataEntrega\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`descricao\` \`descricao\` varchar(255) NULL`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`equipamentoId\` \`equipamentoId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`usuarioId\` \`usuarioId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` DROP FOREIGN KEY \`FK_8d36f3e052b43d2fdbb20a20091\``);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` DROP FOREIGN KEY \`FK_24374677ab4d001eac3f561b76c\``);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` ADD UNIQUE INDEX \`IDX_8d499d082ed91bebf5340c2f7b\` (\`numeroDeSerie\`)`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`colaborador\` ADD UNIQUE INDEX \`IDX_2c7cab1392c28313e5880d941b\` (\`email\`)`);
//         await queryRunner.query(`ALTER TABLE \`colaborador\` ADD UNIQUE INDEX \`IDX_345366b7984e8dcdc1ca3bc5b6\` (\`telefone\`)`);
//         await queryRunner.query(`ALTER TABLE \`colaborador\` CHANGE \`dataRecisao\` \`dataRecisao\` datetime NULL`);
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
//         await queryRunner.query(`ALTER TABLE \`colaborador\` CHANGE \`dataRecisao\` \`dataRecisao\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`colaborador\` DROP INDEX \`IDX_345366b7984e8dcdc1ca3bc5b6\``);
//         await queryRunner.query(`ALTER TABLE \`colaborador\` DROP INDEX \`IDX_2c7cab1392c28313e5880d941b\``);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` DROP INDEX \`IDX_8d499d082ed91bebf5340c2f7b\``);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` ADD CONSTRAINT \`FK_24374677ab4d001eac3f561b76c\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` ADD CONSTRAINT \`FK_8d36f3e052b43d2fdbb20a20091\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`usuarioId\` \`usuarioId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`equipamentoId\` \`equipamentoId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`descricao\` \`descricao\` varchar(255) NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` CHANGE \`dataEntrega\` \`dataEntrega\` datetime NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_180eaa406520e4e25262dc7a259\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_4e7c85732d12ae79aedb54d6023\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_9cb24bca1d212ecbd4427bf8010\` FOREIGN KEY (\`equipamentoId\`) REFERENCES \`equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`movimentacao\` ADD CONSTRAINT \`FK_e6648e1434d11eee2dd0ba31e21\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`tipo_equipamento\` CHANGE \`descricao\` \`descricao\` varchar(255) NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`parametro\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` DROP COLUMN \`numero\``);
//         await queryRunner.query(`ALTER TABLE \`endereco\` ADD \`numero\` varchar(255) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE \`parametro\` ADD CONSTRAINT \`FK_c60f84bc5e540b089242b9c9901\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_172b2625739dfaa7edac4c712ae\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

// }
