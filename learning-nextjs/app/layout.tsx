import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyApp",
  description: "A modern platform for sharing and discovering great content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 antialiased">
        {children}
      </body>
    </html>
  );
}
