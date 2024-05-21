import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { 
  ClerkProvider, 
  SignedOut, 
  SignedIn, 
  RedirectToSignIn, 
  UserButton
} from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCRM",
  description: "A simple CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            <header>
              <UserButton />
            </header>
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
