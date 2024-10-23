import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import InitialSetup from "~/components/global/initial-setup";

export const metadata: Metadata = {
  title: "Rupya.ai | Your Smart Lending Platform",
  description:
    "Leverage AI-powered personalized credit offerings tailored to each applicant. Our lending app analyzes financial, operational, social, and behavioral data in real-time to deliver fast, customized loans. Experience smarter lending with instant approvals",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <InitialSetup>{children}</InitialSetup>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
