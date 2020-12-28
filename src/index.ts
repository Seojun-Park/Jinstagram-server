import dotenv from "dotenv";
import path from "path";
import { Options } from "graphql-yoga";
import {
  GRAPHQL_ENDPOINT,
  PLAYGROUND_ENDPOINT,
  SUBSCRIPTION_ENDPOINT
} from "./env";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import app from "./app";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 4000;
const appOption: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParmas) => {
      console.log(connectionParmas);
    }
  }
};

const AppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOption, AppStart);
  })
  .catch((err) => console.log(err));
