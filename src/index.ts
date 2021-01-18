import "./env";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import app from "./app";
import decodeJWT from "./utils/decodeJWT";

const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";
const PORT = process.env.PORT || 4000;

const appOption: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      const token = connectionParams["Bearer"];
      if (token) {
        const user = await decodeJWT(
          (token as string).includes(" ") ? token.split(" ")[1] : token
        );
        return {
          currentUser: user
        };
      }
      throw new Error("No token, Can't subscribe");
    }
  }
};

const AppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOption, AppStart);
  })
  .catch((err) => console.log(err));
