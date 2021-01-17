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
      const user: User = request.user;
      const { username, action } = args;
      try {
        const requestUser = await User.findOne(
          {
            id: user.id
          },
          { relations: ["followers", "following"] }
        );
        const targetUser = await User.findOne(
          {
            username
          },
          { relations: ["followers", "following"] }
        );
        if (targetUser && requestUser) {
          if (action === "FOLLOW" && targetUser.isFollowing === false) {
            targetUser.isFollowing = true;
            targetUser.followers = [...targetUser.followers, requestUser];
            requestUser.following = [...requestUser.following, targetUser];
            targetUser.save();
            requestUser.save();
            return {
              ok: true,
              err: null
            };
          } else if (action === "UNFOLLOW" && targetUser.isFollowing === true) {
            targetUser.isFollowing = false;
            const tarIdx = targetUser.followers.findIndex((elem) => {
              return elem.username === targetUser.username;
            });
            targetUser.followers.splice(tarIdx, 1);
            targetUser.save();
            const reqIdx = requestUser.following.findIndex((elem) => {
              return elem.username === requestUser.username;
            });
            requestUser.following.splice(reqIdx, 1);
            requestUser.save();
            return {
              ok: true,
              err: null
            };
          } else {
            return {
              ok: false,
              err: "no action or user"
            };
          }
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
