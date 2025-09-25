import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfilesTable1757272950399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profiles",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "firstname",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "lastname",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enumName: "gender_enum",
                        enum: ["male", "female"],
                        isNullable: false
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "20",
                        isNullable: true
                    },
                    {
                        name: "whatsapp",
                        type: "varchar",
                        length: "20",
                        isNullable: true
                    },
                    {
                        name: "profile_picture",
                        type: "varchar",
                        length: "500",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("profiles", true);
    }

}
