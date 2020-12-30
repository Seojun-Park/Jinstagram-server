import { withFilter } from "graphql-yoga";
import Message from "../../../entities/Message";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("newChatMessage");
        },
        async (payload, _, { request }) => {
          console.log(request);
          const user = request.User;
          const message: Message = payload.MessageSubscription;
          console.log(user);
          try {
            const { chatId } = message;
            console.log(chatId);
            return true;
          } catch (err) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;
