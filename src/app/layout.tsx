import type { Metadata } from "next";
import { League_Spartan, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { ViewTransitions } from "next-view-transitions";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-league-spartan",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "necter - Clean Beauty Simplified",
  description: "Discover our curated collection of necter skincare essentials. Science-backed formulas with clean ingredients for healthy, glowing skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${leagueSpartan.variable} ${quicksand.variable}`}>
        <body className="antialiased">
          <Navbar />
          <main className="!pt-18 md:!pt-20" style={{ paddingTop: '4rem' }}>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}