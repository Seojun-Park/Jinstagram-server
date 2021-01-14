import { withFilter } from "graphql-yoga";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("newChatMessage");
        },
        async (payload, _, { context }) => {
          console.log("context", context);
          console.log("payload", payload);
          const user: User = context.currentUser;
          // const user: User = request.user;
          console.log(user);
          const message: Message = payload.MessageSubscription;
          try {
            const { chatId } = message;
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.fromId === user.id || chat.toId === user.id;
            }
            return false;
          } catch (err) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
