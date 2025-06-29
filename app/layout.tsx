import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/app/context/auth_context';
import { PlaceProvider } from "./context/place_context";
import { DataProvider } from "./context/data_context";
import { ToastContainer } from "react-toastify";

import ClientWrapper from "./components/commen_components/clientwrapper";



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
        <ClientWrapper>
        <AuthProvider>
          <DataProvider>
            <PlaceProvider>
              {children}
                <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

              />
            </PlaceProvider>
          </DataProvider>

        </AuthProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
