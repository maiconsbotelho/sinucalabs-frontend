'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import "./globals.css";
import { useState } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "SinucaLabs - Plataforma de Sinuca Online",
//   description: "Jogue sinuca online, participe de campeonatos e conquiste achievements no SinucaLabs",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pt-BR">
      <head>
        <title>SinucaLabs - Plataforma de Sinuca Online</title>
        <meta name="description" content="Jogue sinuca online, participe de campeonatos e conquiste achievements no SinucaLabs" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
