import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/app/context/auth_context';
import { PlaceProvider } from "./context/place_context";
import { DataProvider } from "./context/data_context";





export const metadata: Metadata = {
  title: "Queue App",
  description: "Queue App is a Next.js application that allows users to manage queues efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <AuthProvider>
          <DataProvider>
            <PlaceProvider>
              {children}
            </PlaceProvider>
          </DataProvider>

        </AuthProvider>

      </body>
    </html>
  );
}
