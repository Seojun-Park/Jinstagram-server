import { Resolvers } from "../../../types/resolvers";
import {
  AddCommentMutationArgs,
  AddCommentResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Mutation: {
    AddComment: async (
      _,
      args: AddCommentMutationArgs,
      { request, isAuthenticated }
    ): Promise<AddCommentResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      const { text, postId } = args;
      try {
        const post = await Post.findOne(
          { id: postId }
        );
        if (post) {
          await Comment.create({
            text,
            user,
            post
          }).save();
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
