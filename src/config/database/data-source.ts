import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../../entities/User";
import { env } from "../env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  entities: [User],
  synchronize: env.nodeEnv !== "production",
  logging: env.nodeEnv !== "production",
});
