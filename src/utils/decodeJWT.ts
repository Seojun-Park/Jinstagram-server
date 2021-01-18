import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<any> => {
  try {
    const decoded: any = jwt.verify(
      (token as string).includes(" ") ? token.split(" ")[1] : token,
      process.env.JWT_SECRET || ""
    );
    if (decoded && decoded.id) {
      const { id } = decoded;
      const user = await User.findOne(
        { id },
        {
          relations: [
            "posts",
            "messages",
            "messages.user",
            "chatTo",
            "chatTo.to",
            "chatTo.from",
            "chatTo.messages",
            "chatTo.messages.user",
            "chatFrom",
            "chatFrom.to",
            "chatFrom.from",
            "chatFrom.messages",
            "chatFrom.messages.user",
            "likes",
            "comments",
            "followers",
            "following"
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
