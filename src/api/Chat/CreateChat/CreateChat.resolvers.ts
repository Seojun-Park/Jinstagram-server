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
      args: CreateChatMutationArgs
    ): Promise<CreateChatResponse> => {
      const { fromId, toId } = args;
      try {
        if (fromId && toId) {
          const from = await User.findOne({ id: fromId });
          const to = await User.findOne({ id: toId });
          await Chat.create({
            participants: [from, to]
          });
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
