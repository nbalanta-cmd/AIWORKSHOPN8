import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
