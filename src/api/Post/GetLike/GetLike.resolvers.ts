import Like from "../../../entities/Like";
import { Resolvers } from "../../../types/resolvers";
import { GetLikeQueryArgs, GetLikeResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetLike: async (
      _,
      args: GetLikeQueryArgs,
      { request, isAuthenticated }
    ): Promise<GetLikeResponse> => {
      isAuthenticated(request);
      const { postId } = args;
      try {
        const likes = await Like.find({
          where: {
            postId
          }
        });
        if (likes) {
          return {
            ok: true,
            err: null,
            likes
          };
        } else {
          return {
            ok: false,
            err: "no likes",
            likes: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          likes: null
        };
      }
    }
  }
};
export default resolvers;
