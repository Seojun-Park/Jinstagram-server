import { Resolvers } from "../../../types/resolvers";
import { GetCommentQueryArgs, GetCommentResponse } from "../../../types/graph";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
  Query: {
    GetComment: async (
      _,
      args: GetCommentQueryArgs,
      { request, isAuthenticated }
    ): Promise<GetCommentResponse> => {
      isAuthenticated(request);
      const { postId } = args;
      try {
        const comment = await Comment.findOne({ postId: postId });
        if (comment) {
          return {
            ok: true,
            err: null,
            comment
          };
        } else {
          return {
            ok: false,
            err: "comment not found",
            comment: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          comment: null
        };
      }
    }
  }
};
export default resolvers;
