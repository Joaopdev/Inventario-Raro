import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import createApp from "./config/app";
import createDatabaseConnection from "./config/database/connect";
import createDependencyInjector from "./config/dependencies/createInjector";
import createServer from "./infra/server/server";
import { testandoEquipamento } from "../src/exemplosDeTestes/equipamento";

export const start = async (): Promise<void> => {
  try {
    const connection = await createDatabaseConnection();
    // createDependencyInjector();
    // const app = createApp();
    await testandoEquipamento(connection);
    // createServer(app);
  } catch (error) {
    console.error("Fatal error: ", error);
  }
};

void start();
