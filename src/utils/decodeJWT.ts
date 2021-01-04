import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<any> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (err) {
    return err.message;
  }
};

export default decodeJWT;
