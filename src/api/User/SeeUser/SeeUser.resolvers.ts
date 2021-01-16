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
      isAuthenticated(request);
      const { username } = args;
      try {
        const user = await User.findOne(
          { username },
          {
            relations: [
              "posts",
              "posts.images",
              "likes",
              "comments",
              "followings",
              "followers",
              "followings.user",
              "followers.user"
            ]
          }
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
