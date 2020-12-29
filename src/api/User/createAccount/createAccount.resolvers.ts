import { Resolvers } from "../../../types/resolvers";
import {
  CreateAccountMutationArgs,
  CreateAccountResponse
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      args: CreateAccountMutationArgs
    ): Promise<CreateAccountResponse> => {
      const {
        username,
        email,
        firstName = "",
        lastName = "",
        intro = ""
      } = args;
      const exists = await User.findOne({ email });
      try {
        if (exists) {
          return {
            ok: false,
            err: "This email address is existed account"
          };
        } else {
          const newUser = await User.create({ ...args });
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
