import { Resolvers } from "../../../types/resolvers";
import {
  GetChatRoomQueryArgs,
  GetChatRoomResponse
} from "../../../types/graph";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChatRoom: async (
      _,
      args: GetChatRoomQueryArgs,
      { request, isAuthenticated }
    ): Promise<GetChatRoomResponse> => {
      isAuthenticated(request);
      const { chatId } = args;
      try {
        const chat = await Chat.findOne(
          { id: chatId },
          { relations: ["from", "to", "messages"] }
        );
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
