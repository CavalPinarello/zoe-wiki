// Authentication configuration - ready to be enabled
// Uncomment this file and the related imports when you're ready to add Gmail authentication

/*
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // You can add domain restrictions here
      // For example, only allow @yourcompany.com emails
      if (account?.provider === "google") {
        // return profile?.email?.endsWith("@yourcompany.com") ?? false;
        return true; // Allow all Gmail accounts for now
      }
      return true;
    },
    async session({ session, token }) {
      // You can add custom session properties here
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Middleware to protect routes
export function withAuth(handler: any) {
  return async (req: any, res: any) => {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    return handler(req, res, session);
  };
}
*/

// Temporary placeholder for authentication state
export const isAuthEnabled = false;

// Instructions for enabling authentication:
// 1. Create a Google Cloud Project and enable Google+ API
// 2. Create OAuth 2.0 credentials
// 3. Add these environment variables to .env.local:
//    - GOOGLE_CLIENT_ID=your_client_id
//    - GOOGLE_CLIENT_SECRET=your_client_secret
//    - NEXTAUTH_SECRET=your_secret_key (generate with: openssl rand -base64 32)
//    - NEXTAUTH_URL=http://localhost:3000 (or your production URL)
// 4. Uncomment the code above
// 5. Create app/api/auth/[...nextauth]/route.ts file
// 6. Wrap your app with SessionProvider in layout.tsx
