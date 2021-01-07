import { Resolvers } from "../../../types/resolvers";
import { GetPostQueryArgs, GetPostResponse } from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetPost: async (
      _,
      args: GetPostQueryArgs,
      { request, isAuthenticated }
    ): Promise<GetPostResponse> => {
      isAuthenticated(request);
      const { postId } = args;
      try {
        const post = await Post.findOne(
          { id: postId },
          { relations: ["images"] }
        );
        if (post) {
          return {
            ok: true,
            err: null,
            post
          };
        } else {
          return {
            ok: false,
            err: "No post found",
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
