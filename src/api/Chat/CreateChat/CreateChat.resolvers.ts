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
      const { toId } = args;
      try {
        if (toId) {
          const to = await User.findOne({ id: toId });
          await Chat.create({ to });
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
