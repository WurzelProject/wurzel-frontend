import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {ThemeProvider} from "@/components/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Wurzel Engine",
  description: "Wurzel Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark:bg-gray-900">
    <body
      className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col dark:bg-gray-900 dark:text-white`}
    >
    <ThemeProvider>
      <Navbar />
      <main className="flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
    </body>
    </html>
  );
}
