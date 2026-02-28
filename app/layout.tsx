import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "@/components/global/Header";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Bold.woff",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.woff",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.woff",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003",
  ),
  title: {
    default: "DJ Blaqmix | The Dimple DJ",
    template: "%s | DJ Blaqmix",
  },
  description:
    "DJ Blaqmix delivers high-energy DJ experiences for weddings, corporate events, private parties, and nightlife.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/images/blaqmix_logo_black.png",
  },
  openGraph: {
    title: "DJ Blaqmix | The Dimple DJ",
    description:
      "Book DJ Blaqmix for unforgettable events, premium sound, and crowd-moving sets.",
    url: "/",
    siteName: "DJ Blaqmix",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/blaqmix_standing.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Blaqmix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Blaqmix | The Dimple DJ",
    description:
      "Book DJ Blaqmix for unforgettable events, premium sound, and crowd-moving sets.",
    images: ["/images/blaqmix_standing.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} ${poppins.variable} ${geistMono.variable} ${clashDisplay.variable} relative antialiased`}
      >
        <Header />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#f44336",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#f44336",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
