import { AuthorizeUserInputDTO } from "@/module/user/application/use_cases/authorize_user/authorize_user_dtos";
import { CompositionRoot } from "@/composition_root";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { config } from "@/config";

const serviceContainer = CompositionRoot.getInstance(config);

const authorizeUserUseCase =
  serviceContainer.userModule.getAuthorizeUserUseCase();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const input: AuthorizeUserInputDTO = {
          email: credentials.email as string,
          password: credentials.password as string,
        };
        try {
          const output = await authorizeUserUseCase.execute(input);
          if (!output.user || output.error) {
            throw new Error(`${output.error ?? "Invalid email or password"}`);
          }
          return output.user;
        } catch (error) {
          throw new Error(`${error ?? "Invalid email or password"}`);
        }
      },
    }),
  ],
  callbacks: {
    redirect: async ({ baseUrl }) => {
      return `${baseUrl}`;
    },
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
