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
      const post = await Post.findOne({ id: postId }, { relations: ["likes"] });
      try {
        if (post) {
          const existLike = await Like.findOne({
            where: {
              userId: user.id
            }
          });
          if (existLike) {
            await Like.delete({ id: existLike.id });
            return {
              ok: true,
              err: null,
              ret: "DEL"
            };
          } else {
            await Like.create({
              post,
              user
            }).save();
            return {
              ok: true,
              err: null,
              ret: "CRA"
            };
          }
        } else {
          return {
            ok: false,
            err: "Not found the post",
            ret: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          ret: null
        };
      }
    }
  }
};

export default resolvers;
