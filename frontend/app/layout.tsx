import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mαind",
  description: "Mαind: AI-Driven Chat & Insights Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header style={{ padding: '1rem', background: '#f0f0f0' }}>
          <nav>
            <Link href="/dashboard">Dashboard</Link> | 
            <Link href="/auth">Auth</Link> | 
            <Link href="/insights">Insights</Link> | 
            <Link href="/mindmap">Mind Map</Link> | 
            <Link href="/profile">Profile</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
