import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yididiya Kebede | Software Engineer & Data Scientist",
  description:
    "Portfolio of Yididiya Kebede Aga — Full-stack Developer and MS Data Science candidate at Northeastern University.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
