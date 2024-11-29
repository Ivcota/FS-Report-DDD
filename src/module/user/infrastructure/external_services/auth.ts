import { AuthorizeUserInputDTO } from "@/module/user/application/use_cases/authorize_user/authorize_user_dtos";
import { AuthorizeUserUseCase } from "@/module/user/application/use_cases/authorize_user/authorize_user_use_case";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { ServiceContainer } from "@/service_container";

const serviceContainer = ServiceContainer.getInstance();
const userRepository = serviceContainer.userRepository;

const authorizeUserUseCase = new AuthorizeUserUseCase(userRepository);

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
