import { Resolvers } from "../../../types/resolvers";
import {
  ToggleLikeMutationArgs,
  ToggleLikeResponse
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Mutation: {
    ToggleLike: async (
      _,
      args: ToggleLikeMutationArgs,
      { request, isAuthenticated }
    ): Promise<ToggleLikeResponse> => {
      isAuthenticated(request);
      const { postId } = args;
      const post = await Post.findOne({ id: postId });
      try {
        if (post) {
          post.isLiked = post.isLiked === false ? true : false;
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "Not found the post"
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
