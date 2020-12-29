import { Resolvers } from "../../../types/resolvers";
import { EditUserMutationArgs, EditUserResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EditUser: async (
      _,
      args: EditUserMutationArgs,
      { request, isAuthenticated }
    ): Promise<EditUserResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      const notNull = cleanNullArgs(args);
      try {
        await User.update({ id: user.id }, { ...notNull });
        return {
          ok: true,
          err: null
        };
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
