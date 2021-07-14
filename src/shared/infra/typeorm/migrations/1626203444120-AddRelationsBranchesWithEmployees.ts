import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AddRelationsBranchesWithEmployees1626203444120
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "employees",
      new TableColumn({
        name: "branch_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "employees",
      new TableForeignKey({
        name: "IdEmployeesBranch",
        columnNames: ["branch_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "branches",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("branches", "IdEmployeesBranch");
    await queryRunner.dropColumn("branches", "branch_id");
  }
}
