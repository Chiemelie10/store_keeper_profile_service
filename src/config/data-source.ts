import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_DATABASE || "test",
    synchronize: false,
    migrationsRun: false,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
})
