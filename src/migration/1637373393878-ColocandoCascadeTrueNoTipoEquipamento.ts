// import {MigrationInterface, QueryRunner} from "typeorm";

// export class ColocandoCascadeTrueNoTipoEquipamento1637373393878 implements MigrationInterface {
//     name = 'ColocandoCascadeTrueNoTipoEquipamento1637373393878'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE \`tipo_equipamento\` DROP FOREIGN KEY \`FK_112c85cd9206798d83ce6f1ac27\``);
//         await queryRunner.query(`DROP INDEX \`IDX_c60f84bc5e540b089242b9c990\` ON \`parametro\``);
//         await queryRunner.query(`DROP INDEX \`REL_112c85cd9206798d83ce6f1ac2\` ON \`tipo_equipamento\``);
//         await queryRunner.query(`ALTER TABLE \`tipo_equipamento\` DROP COLUMN \`parametroId\``);
//         await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_172b2625739dfaa7edac4c712ae\``);
//         await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`parametro\` DROP FOREIGN KEY \`FK_c60f84bc5e540b089242b9c9901\``);
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
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL`);
//         await queryRunner.query(`ALTER TABLE \`colaborador\` CHANGE \`dataRecisao\` \`dataRecisao\` datetime NULL`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_172b2625739dfaa7edac4c712ae\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`parametro\` ADD CONSTRAINT \`FK_c60f84bc5e540b089242b9c9901\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`equipamento\` CHANGE \`tipoEquipamentoId\` \`tipoEquipamentoId\` int NULL DEFAULT 'NULL'`);
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
//         await queryRunner.query(`ALTER TABLE \`parametro\` ADD CONSTRAINT \`FK_c60f84bc5e540b089242b9c9901\` FOREIGN KEY (\`tipoEquipamentoId\`) REFERENCES \`tipo_equipamento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`colaboradorId\` \`colaboradorId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_172b2625739dfaa7edac4c712ae\` FOREIGN KEY (\`colaboradorId\`) REFERENCES \`colaborador\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE \`tipo_equipamento\` ADD \`parametroId\` int NULL DEFAULT 'NULL'`);
//         await queryRunner.query(`CREATE UNIQUE INDEX \`REL_112c85cd9206798d83ce6f1ac2\` ON \`tipo_equipamento\` (\`parametroId\`)`);
//         await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c60f84bc5e540b089242b9c990\` ON \`parametro\` (\`tipoEquipamentoId\`)`);
//         await queryRunner.query(`ALTER TABLE \`tipo_equipamento\` ADD CONSTRAINT \`FK_112c85cd9206798d83ce6f1ac27\` FOREIGN KEY (\`parametroId\`) REFERENCES \`parametro\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

// }
