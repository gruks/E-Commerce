import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcomStore - Your Online Shopping Destination",
  description: "Shop the latest products with fast shipping and great prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
