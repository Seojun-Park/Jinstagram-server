import { Resolvers } from "../../../types/resolvers";
import {
  ToggleFollowingMutationArgs,
  ToggleFollowingResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    ToggleFollowing: async (
      _,
      args: ToggleFollowingMutationArgs,
      { request, isAuthenticated }
    ): Promise<ToggleFollowingResponse> => {
      isAuthenticated(request);
      const { username } = args;
      try {
        const targetUser = await User.findOne({
          username
        });
        if (targetUser) {
          targetUser.isFollowing =
            targetUser.isFollowing === false ? true : false;
          targetUser.save();
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "Can't find this user"
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message
        };
      }
    }
  }
};

export default resolvers;
