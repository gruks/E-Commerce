import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import ClientWrapper from "@/src/components/ui/ClientWrapper";
import { GlobalCartDrawer } from "@/src/components/layout/GlobalCartDrawer";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { LoadingProvider } from "@/src/contexts/LoadingContext";
import { ViewTransitions } from "next-view-transitions";

const harmond = localFont({
  src: [
    {
      path: "../../public/fonts/Harmond-SemiBoldCondensed.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Harmond-SemBdItaCond.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Harmond-ExtraBoldExpanded.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Harmond-ExtBdItaExp.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-harmond",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
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
      <html lang="en" className={`${harmond.variable} ${montserrat.variable}`}>
        <body className="antialiased">
          <LoadingProvider>
            <AuthProvider>
              <ClientWrapper showLoading={true} loadingDuration={2500}>
                <Navbar />
                <main className="!pt-18 md:!pt-20" style={{ paddingTop: '4rem' }}>
                  {children}
                </main>
                <Footer />
                <GlobalCartDrawer />
              </ClientWrapper>
            </AuthProvider>
          </LoadingProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}