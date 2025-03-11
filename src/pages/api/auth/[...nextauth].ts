import environtments from "@/config/environtments";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtendeded, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.services";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environtments.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authServices.login({
          identifier,
          password,
        });

        const accesToken = result.data.data;

        const me = await authServices.getProfileWithToken(accesToken);
        const user = me.data.data;

        if (
          accesToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accesToken = accesToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtendeded;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtendeded;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accesToken;

      return session;
    },
  },
});
