import { Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt, { compare } from "bcryptjs" 
import { collections, dbConnect } from "@/lib/dbConnect";
import { JWT } from "next-auth/jwt";

interface IUser{
id:string;
name:string;
email:string;
password: string;
role?:string;
}



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
    email:{label:"Email", type:"email" },
    password:{label:"Password", type:"password" },
      },
      async authorize(credentials, req): Promise<Omit<IUser, "password"> | null> {
 if(!credentials?.email || !credentials?.password) return null;
 const userCollections =await dbConnect(collections.USERS);
 const user = await userCollections.findOne<IUser>({
  email: credentials?.email
 })
 if(!user) return null;
 const isPasswordCorrect =await bcrypt.compare(credentials.password, user.password)
 if(!isPasswordCorrect) return null;
return {
  id: user?._id.toString(),
  name: user?.name,
  email: user?.email,
  role: user?.role || "student"
}
      }
    })
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User & { role?: string } }): Promise<JWT> {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
