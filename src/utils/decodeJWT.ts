import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<any> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    if (decoded && decoded.id) {
      const { id } = decoded;
      const user = await User.findOne(
        { id },
        {
          relations: [
            "posts",
            "messages",
            "likes",
            "comments",
            "followers",
            "followings"
          ]
        }
      );
      return user;
    }
    return undefined;
  } catch (err) {
    return err.message;
  }
};

export default decodeJWT;
