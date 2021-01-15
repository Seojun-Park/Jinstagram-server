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
        const existedChat = await Chat.findOne({
          where: [{ fromId: user.id }, { toId }]
        });
        if (existedChat) {
          return {
            ok: true,
            err: null,
            chat: existedChat
          };
        } else {
          if (user && toId) {
            const to = await User.findOne({ id: toId });
            const from = await User.findOne({ id: user.id });
            const chat = await Chat.create({ from, to }).save();
            return {
              ok: true,
              err: null,
              chat
            };
          } else {
            return {
              ok: false,
              err: "No user found",
              chat: null
            };
          }
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          chat: null
        };
      }
    }
  }
};

export default resolvers;
