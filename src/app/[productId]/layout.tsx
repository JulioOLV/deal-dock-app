import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "DealDock - Product Detail",
  description: "Aqui você encontra os detalhes de cada produto.",
};

export default function ProductDetailLayout({
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
