import { Resolvers } from "../../../types/resolvers";
import {
  CreateChatMutationArgs,
  CreateChatResponse
} from "../../../types/graph";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateChat: async (
      _,
      args: CreateChatMutationArgs,
      { request, isAuthenticated }
    ): Promise<CreateChatResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      const { toId } = args;
      try {
        if (user && toId) {
          const to = await User.findOne({ id: toId });
          const from = await User.findOne({ id: user.id });
          await Chat.create({ from, to });
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "No user found"
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
