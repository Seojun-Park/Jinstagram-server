import { Resolvers } from "../../../types/resolvers";
import {
  ToggleLikeMutationArgs,
  ToggleLikeResponse
} from "../../../types/graph";
import Post from "../../../entities/Post";
import User from "../../../entities/User";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
  Mutation: {
    ToggleLike: async (
      _,
      args: ToggleLikeMutationArgs,
      { request, isAuthenticated }
    ): Promise<ToggleLikeResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      const { postId } = args;
      const post = await Post.findOne({ id: postId });
      try {
        if (post) {
          if (post.isLiked === false) {
            post.isLiked = true;
            await Like.create({
              user,
              post
            }).save();
          } else {
            post.isLiked = false;
            await Like.delete({
              postId: post.id
            });
          }
          post.save();
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
