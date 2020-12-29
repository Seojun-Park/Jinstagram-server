import { Resolvers } from "../../../types/resolvers";
import {
  RequestCodeMutationArgs,
  RequestCodeResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    RequestCode: async (
      _,
      args: RequestCodeMutationArgs
    ): Promise<RequestCodeResponse> => {
      const { email } = args;
      try {
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
