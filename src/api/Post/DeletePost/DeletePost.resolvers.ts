import { Resolvers } from "../../../types/resolvers";
import {
  DeletePostMutationArgs,
  DeletePostResponse
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Mutation: {
    DeletePost: async (
      _,
      args: DeletePostMutationArgs,
      { request, isAuthenticated }
    ): Promise<DeletePostResponse> => {
      isAuthenticated(request);
      const { postId } = args;
      try {
        if (postId) {
          await Post.delete({ id: postId });
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "no post ID"
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
