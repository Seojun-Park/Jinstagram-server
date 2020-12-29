import { Resolvers } from "../../../types/resolvers";
import {
  CreateAccountMutationArgs,
  CreateAccountResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CreateAccount: async (
      _,
      args: CreateAccountMutationArgs
    ): Promise<CreateAccountResponse> => {
      const { email } = args;
      const exists = await User.findOne({ email });
      try {
        if (exists) {
          return {
            ok: false,
            err: "This email address is existed account"
          };
        } else {
          await User.create({ ...args }).save();
          return {
            ok: true,
            err: null
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
