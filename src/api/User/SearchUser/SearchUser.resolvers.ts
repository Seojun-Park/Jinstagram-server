import { Resolvers } from "../../../types/resolvers";
import { SearchUserQueryArgs, SearchUserResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    SearchUser: async (
      _,
      args: SearchUserQueryArgs,
      { request, isAuthenticated }
    ): Promise<SearchUserResponse> => {
      isAuthenticated(request);
      const { term } = args;
      try {
        const users = await getRepository(User)
          .createQueryBuilder()
          .select()
          .where("username ILIKE :searchTerm", { searchTerm: `_${term}_` })
          .orWhere("email LIKE :searchTerm", { searchTerm: `%${term}` })
          .getMany();
        if (users) {
          return {
            ok: true,
            err: null,
            users
          };
        } else {
          return {
            ok: false,
            err: "no user found",
            users: null
          };
        }
      } catch (err) {
        return {
          ok: false,
          err: err.message,
          users: null
        };
      }
    }
  }
};

export default resolvers;
