import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins} from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets:['latin'],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "Techno Pulse",
  description: "Never Miss a Moment",
  icons: {icon: './assets/images/logo.svg'},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={poppins.variable}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
