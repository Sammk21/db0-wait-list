import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Divide By Zero",
  description: "Waitlist form for divide by zero",
  generator: "Sameer Khan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="https://use.typekit.net/uuv2zzr.css" />
      </head>
      <body>
        <main>
          {children}
          <Toaster richColors />
        </main>
      </body>
    </html>
  );
}
