import { Resolvers } from "../../../types/resolvers";
import {
  RequestCodeMutationArgs,
  RequestCodeResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { generateCode, sendSecretMail } from "../../../utils/auth";

const resolvers: Resolvers = {
  Mutation: {
    RequestCode: async (
      _,
      args: RequestCodeMutationArgs
    ): Promise<RequestCodeResponse> => {
      const { email } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            err: "No user found with that email",
            code: null
          };
        } else {
          const code = generateCode();
          await sendSecretMail(email, code);
          user.loginSecret = code;
          user.save();
          return {
            ok: true,
            err: null,
            code
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          code: null
        };
      }
    }
  }
};

export default resolvers;
