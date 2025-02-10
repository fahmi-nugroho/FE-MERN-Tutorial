import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accesToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtendeded extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  ILogin,
  IActivation,
  JWTExtendeded,
  SessionExtended,
  UserExtended,
};
