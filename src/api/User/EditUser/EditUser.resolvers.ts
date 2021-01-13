import { Resolvers } from "../../../types/resolvers";
import { EditUserMutationArgs, EditUserResponse } from "../../../types/graph";
// import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";
import sortArgs from "../../../utils/sortArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditUser: async (
      _,
      args: EditUserMutationArgs,
      { request, isAuthenticated }
    ): Promise<EditUserResponse> => {
      isAuthenticated(request);
      const user: User = request.user;
      try {
        const targetUser = await User.findOne({ id: user.id });
        if (targetUser) {
          const prevData = {
            profilePhoto: targetUser.profilePhoto,
            intro: targetUser.intro,
            username: targetUser.username,
            firstName: targetUser.firstName,
            lastName: targetUser.lastName
          };
          const notNull = sortArgs(prevData, args);
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            err: null
          };
        } else {
          return {
            ok: false,
            err: "no user found"
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
