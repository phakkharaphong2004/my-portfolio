import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LangProvider } from "./components/LangProvider";
import LangSwitcher from "./components/LangSwitcher";
import FallingIcons from "./components/FallingIcons";
import SoundManager from "./components/SoundManager";
import CursorGlow from "./components/CursorGlow";
import BootIntro from "./components/BootIntro";
import ClickRipple from "./components/ClickRipple";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phakkharaphong Sarang-ngam",
  description: "Full-Stack Developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LangProvider>
          <Navbar />
          <LangSwitcher />
          <FallingIcons />
          <SoundManager />
          <CursorGlow />
          <BootIntro />
          <ClickRipple />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
