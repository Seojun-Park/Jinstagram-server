import { Resolvers } from "../../../types/resolvers";
import {
  ToggleFollowingMutationArgs,
  ToggleFollowingResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Following from "../../../entities/Following";
import Follower from "../../../entities/Follower";

const resolvers: Resolvers = {
  Mutation: {
    ToggleFollowing: async (
      _,
      args: ToggleFollowingMutationArgs,
      { request, isAuthenticated }
    ): Promise<ToggleFollowingResponse> => {
      isAuthenticated(request);
      const requestUser: User = request.user;
      const { username } = args;
      try {
        const targetUser = await User.findOne(
          {
            username
          },
          { relations: ["followers", "followings"] }
        );
        if (targetUser) {
          targetUser.isFollowing =
            targetUser.isFollowing === false ? true : false;
          if (targetUser.isFollowing) {
            const following = await Following.create({
              user: requestUser
            }).save();
            const follower = await Follower.create({
              user: targetUser
            }).save();
            if (targetUser.followers.length !== 0) {
              targetUser.followers = [...targetUser.followers, following];
            } else {
              targetUser.followers = [following];
            }
            requestUser.followings = [...requestUser.followings, follower];
            targetUser.save();
            requestUser.save();
          } else {
            await Following.delete({ userId: requestUser.id });
            await Follower.delete({ userId: targetUser.id });
          }
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
