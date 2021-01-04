import { Resolvers } from "../../../types/resolvers";
import {
  GoogleConnectMutationArgs,
  GoogleConnectResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { generateToken } from "../../../utils/auth";

const resolvers: Resolvers = {
  Mutation: {
    GoogleConnect: async (
      _,
      args: GoogleConnectMutationArgs
    ): Promise<GoogleConnectResponse> => {
      const { googleId, lastName, firstName, email } = args;
      try {
        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
          const token = generateToken(existingUser.id);
          return {
            ok: true,
            err: null,
            token
          };
        }
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          googleId,
          username: `${firstName} ${lastName}`
        }).save();
        if (newUser) {
          const token = generateToken(newUser.id);
          return {
            ok: true,
            err: null,
            token
          };
        } else {
          return {
            ok: false,
            err: "Fail to create an account",
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
