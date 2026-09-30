import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,

  trustedOrigins: [
    "http://frakdev.ru",
    "http://www.frakdev.ru",
  ],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {
    modelName: "User",
  },

  session: {
    modelName: "Session",
  },

  account: {
    modelName: "Account",
  },

  verification: {
    modelName: "Verification",
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 3600,

    // Подключим SMTP перед запуском восстановления пароля.
    sendResetPassword: async () => {
      throw new Error("Password reset email service is not configured yet");
    },
  },

  plugins: [
    username({
      displayUsername: false,
      immutableUsername: true,
    }),
  ],
});
