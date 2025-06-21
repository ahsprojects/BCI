import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Computer Interface",
  description: "Sync Your Mind, Control Your World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href='./favicon.ico' />
      </Head>
      <body className={dm_sans.className}>
        {children}
      </body>
    </html>
  );
}
