import { Request } from "express";
import { TokenPayload } from "./TokenPayload";

export default interface RequestWithUserData extends Request {
  usuario: TokenPayload;
}
