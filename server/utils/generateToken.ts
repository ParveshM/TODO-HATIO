import jwt from "jsonwebtoken";
import ENV from "./ENV";
type JWTPayload = {
  email: string;
  id: string;
};
export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, ENV.JWT_SECRET as string, {
    expiresIn: "2d",
  });
};
