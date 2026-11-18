import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { env } from "@/config/env";
import { ROUTES } from "@/config/routes";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    ...(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
        ]
      : []),
    ...(env.AUTH_APPLE_ID && env.AUTH_APPLE_SECRET
      ? [
          Apple({
            clientId: env.AUTH_APPLE_ID,
            clientSecret: env.AUTH_APPLE_SECRET,
          }),
        ]
      : []),
  ],

  secret: env.AUTH_SECRET,

  // ── Sesión JWT — sin base de datos ──────────────────────────────────────────
  session: { strategy: "jwt" },

  // ── Páginas personalizadas ───────────────────────────────────────────────────
  pages: {
    signIn: ROUTES.login,
    error: ROUTES.login,
  },

  // ── Callbacks ────────────────────────────────────────────────────────────────
  callbacks: {
    // Controla el acceso a rutas en el matcher del middleware.
    // `true` → permite. `false` → redirige a pages.signIn con callbackUrl.
    authorized({ auth: session }) {
      return !!session?.user;
    },

    // Persiste el proveedor OAuth en el JWT al momento del login inicial.
    jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    // Expone id y proveedor en la sesión accesible desde el cliente.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.provider = token.provider as string | undefined;
      }
      return session;
    },
  },
});
