import { Resolvers } from "../../../types/resolvers";
import {
  UploadPostMutationArgs,
  UploadPostResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Image from "../../../entities/Image";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Mutation: {
    UploadPost: async (
      _,
      args: UploadPostMutationArgs,
      { request, isAuthenticated }
    ): Promise<UploadPostResponse> => {
      isAuthenticated(request);
      const { location = "", caption = "", images } = args;
      const user: User = request.user;
      let post: Post;
      try {
        if (location && caption) {
          post = await Post.create({
            location,
            caption,
            user
          }).save();
        } else {
          post = await Post.create({
            location: "",
            caption: "",
            user
          }).save();
        }
        // await User.update(
        //   {
        //     id: user.id
        //   },
        //   {
        //     posts: [{ ...post }]
        //   }
        // );
        const createdPost = await Post.findOne(
          { id: post.id },
          { relations: ["images"] }
        );
        if (images?.length !== 0) {
          images?.map(async (image) => {
            await Image.create({
              post: createdPost,
              url: image
            }).save();
          });
        }
        return {
          ok: true,
          err: null
        };
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
