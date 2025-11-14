import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import I18nProvider from "./providers/I18nProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TecWeb Studio",
  description: "Futuristic web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <I18nProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
