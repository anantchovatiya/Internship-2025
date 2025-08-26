import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import mongoose from 'mongoose'
import User from '@/models/User'
import connectDB from '@/db/connectDB'

export const authoptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github' || account.provider === 'google') {
        await connectDB(); // Ensure await!
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          const newUser = new User({
            email: profile.email,
            username: profile.email.split('@')[0],
          });
          await newUser.save();
        }
      }
      return true;
    },

    async session({ session, token }) {
      await connectDB(); // Important in serverless
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
