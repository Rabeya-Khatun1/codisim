// src/lib/authOptions.ts
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { collections, dbConnect } from "@/lib/dbConnect";

// Extended User type with role
interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

// Extend NextAuth Token to include role
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

// Extend NextAuth Session user to include role
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      role?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials is", credentials)
        if (!credentials?.email || !credentials?.password) return null;

        const userCollections = await dbConnect<IUser>(collections.USERS);
        const user = await userCollections.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "student",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },

callbacks: {

  async jwt({ token, user }) {
    if (user && "role" in user && typeof user.role === "string") {
      token.role = user.role; 
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) session.user.role = token.role;
    return session;
  },
},
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };