import Post from "../../../entities/Post";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import {
  GetFollowedPostQueryArgs,
  GetFollowedPostResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetFollowedPost: async (
      _,
      args: GetFollowedPostQueryArgs,
      { request, isAuthenticated }
    ): Promise<GetFollowedPostResponse> => {
      isAuthenticated(request);
      const { page } = args;
      console.log(page);
      const following = await User.find({
        where: {
          isFollowing: true
        },
        order: {
          updatedAt: "DESC"
        }
      });
      try {
        if (following.length !== 0) {
          const post = await Post.find({
            where: {
              user: {
                isFollowing: true
              }
            },
            take: page * 5,
            order: {
              updatedAt: "DESC"
            },
            relations: ["user", "likes", "comments"]
          });
          return {
            ok: true,
            err: null,
            post
          };
        } else {
          return {
            ok: false,
            err: "You don't have any followers",
            post: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          post: null
        };
      }
    }
  }
};

export default resolvers;
