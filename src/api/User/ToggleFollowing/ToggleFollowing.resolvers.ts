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
      const me: User = request.user;
      const { username } = args;
      try {
        const targetUser = await User.findOne(
          {
            username
          },
          { relations: ["followers"] }
        );
        if (targetUser) {
          targetUser.isFollowing =
            targetUser.isFollowing === false ? true : false;
          if (targetUser.isFollowing) {
            const following = await Following.create({
              user: targetUser
            }).save();
            const follower = await Follower.create({ user: me }).save();
            if (targetUser.followers.length !== 0) {
              targetUser.followers = [...targetUser.followers, follower];
            } else {
              targetUser.followers = [follower];
            }
            me.followings = [...me.followings, following];
            targetUser.save();
            me.save();
          } else {
            await Following.delete({ userId: targetUser.id });
            await Follower.delete({ userId: me.id });
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
