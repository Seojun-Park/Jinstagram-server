import { Resolvers } from "../../../types/resolvers";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graph";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { request, pubSub, isAuthenticated }
    ): Promise<SendMessageResponse> => {
      isAuthenticated(request);
      const { text, chatId } = args;
      try {
        const chat = await Chat.findOne({ id: chatId });
        if (chat && chat.to && chat.from) {
          const message = await Message.create({
            text,
            chat
          }).save();
          pubSub.publish("newChatMessage", {
            MessageSubscription: message
          });
          return {
            ok: true,
            err: null,
            message
          };
        } else {
          return {
            ok: false,
            err: "No Chat",
            message: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          message: null
        };
      }
    }
  }
};

export default resolvers;
