import { Resolvers } from "../../../types/resolvers";
import {
  ConfirmSecretMutationArgs,
  ConfirmSecretResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { generateToken } from "../../../utils/auth";

const resolvers: Resolvers = {
  Mutation: {
    ConfirmSecret: async (
      _,
      args: ConfirmSecretMutationArgs
    ): Promise<ConfirmSecretResponse> => {
      const { email, code } = args;
      const user = await User.findOne({ email });
      try {
        if (user?.loginSecret === code) {
          user.loginSecret = "";
          const token = generateToken(user.id);
          return {
            ok: true,
            err: null,
            token
          };
        } else {
          return {
            ok: false,
            err: "Wrong email and code combination",
            token: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
