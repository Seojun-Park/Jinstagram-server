import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import { GraphQLServer, PubSub } from "graphql-yoga";
import schema from "./schema";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./utils/auth";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: ({ request }) => {
        console.log(request.connection);
        return {
          request,
          pubSub: this.pubSub,
          isAuthenticated
        };
      }
      // context: ({ request }) => ({ request, isAuthenticated })
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(authenticateJwt);
    this.app.express.use(helmet());
  };
}

export default new App().app;
