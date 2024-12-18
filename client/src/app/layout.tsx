import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

import Navbar from "@/components/ui/navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "Project Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <Navbar>
                <UserButton />
              </Navbar>
            </SignedIn>
            {children}
            <ReactQueryDevtools />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
