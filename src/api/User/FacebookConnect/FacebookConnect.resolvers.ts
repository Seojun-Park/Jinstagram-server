import { Resolvers } from "../../../types/resolvers";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import { generateToken } from "../../../utils/auth";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId, firstName, lastName, email } = args;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          const token = generateToken(existingUser.id);
          return {
            ok: true,
            err: null,
            token
          };
        } else {
          try {
            const newUser = await User.create({
              firstName,
              lastName,
              email,
              username: `${firstName} ${lastName}`,
              profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
            }).save();
            const token = generateToken(newUser.id);
            return {
              ok: true,
              err: null,
              token
            };
          } catch (err) {
            return {
              ok: false,
              err: "Can not create an account",
              token: null
            };
          }
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