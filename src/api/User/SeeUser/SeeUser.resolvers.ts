import { Resolvers } from "../../../types/resolvers";
import { SeeUserQueryArgs, SeeUserResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    SeeUser: async (
      _,
      args: SeeUserQueryArgs,
      { request, isAuthenticated }
    ): Promise<SeeUserResponse> => {
      const { userId } = args;
      try {
        const user = await User.findOne(
          { id: userId },
          { relations: ["posts, comments, likes"] }
        );
        if (user) {
          return {
            ok: true,
            err: null,
            user
          };
        } else {
          return {
            ok: false,
            err: "user not found",
            user: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          user: null
        };
      }
    }
  }
};

export default resolvers;
