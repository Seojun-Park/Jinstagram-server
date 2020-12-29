import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { MeResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    Me: async (_, __, { request, isAuthenticated }): Promise<MeResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      try {
        if (user) {
          return {
            ok: true,
            err: null,
            user
          };
        } else {
          return {
            ok: false,
            err: "Check your account",
            user: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: null,
          user: null
        };
      }
    }
  }
};

export default resolvers;
