import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { request, isAuthenticated, pubSub }
    ): Promise<SendMessageResponse> => {
      isAuthenticated(request);
      const { text, chatId } = args;
      const user: User = request.user;
      try {
        const chat = await Chat.findOne({ id: chatId });
        if (chat) {
          const message = await Message.create({
            text,
            chat,
            user
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
            err: "no chat",
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
