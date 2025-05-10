import type { Metadata } from "next";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "DealDock",
  description: "Search for the best products and prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
