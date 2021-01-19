import "./env";

import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  // database: process.env.DB_NAME || "jinstagram",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["entities/**/*.*"],
  port: 5432,
  host: process.env.DB_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

export default connectionOptions;
