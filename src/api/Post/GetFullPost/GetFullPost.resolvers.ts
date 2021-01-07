import Post from "../../../entities/Post";
import { Resolvers } from "../../../types/resolvers";
import {
  GetFullPostQueryArgs,
  GetFullPostResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetFullPost: async (
      _,
      args: GetFullPostQueryArgs,
      { isAuthenticated, request }
    ): Promise<GetFullPostResponse> => {
      isAuthenticated(request);
      const { page } = args;
      const user: User = request.user;
      try {
        const post = await Post.find({
          take: page * 5,
          where: [{ user: { isFollowing: true } }, { user: { id: user.id } }],
          order: {
            updatedAt: "DESC"
          },
          relations: ["user", "likes", "comments", "images"]
        });
        if (post) {
          return {
            ok: true,
            err: null,
            post
          };
        } else {
          return {
            ok: false,
            err: "You don't have any feed to be shown",
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
