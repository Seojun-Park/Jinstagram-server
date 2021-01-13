import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { GetChatResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetChat: async (
      _,
      __,
      { request, isAuthenticated }
    ): Promise<GetChatResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      try {
        const chat = await Chat.find({
          where: [{ fromId: user.id }, { toId: user.id }]
        });
        if (chat) {
          return {
            ok: true,
            err: null,
            chat
          };
        } else {
          return {
            ok: false,
            err: "No chat found",
            chat: null
          };
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
