import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "投資将軍",
  description: "あなたの投資家タイプを診断します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
