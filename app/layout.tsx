import type { Metadata } from "next";
import { Cinzel, EB_Garamond, UnifrakturCook } from "next/font/google";
import "./globals.css";

const blackletter = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-blackletter",
  display: "swap",
});
const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nataniel Balantac",
  description: "Nataniel Balantac, a senior at UH Manoa studying linguistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${blackletter.variable} ${display.variable} ${body.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
