import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { MeResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    Me: async (_, __, { request, isAuthenticated }): Promise<MeResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      try {
        const fullUser = await User.findOne(
          {
            id: user.id
          },
          {
            relations: [
              "posts",
              "chatTo",
              "chatTo.to",
              "chatTo.from",
              "chatTo.messages",
              "chatTo.messages.user",
              "chatFrom",
              "chatFrom.to",
              "chatFrom.from",
              "chatFrom.messages",
              "chatFrom.messages.user"
            ]
          }
        );
        if (fullUser) {
          return {
            ok: true,
            err: null,
            user: fullUser
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
