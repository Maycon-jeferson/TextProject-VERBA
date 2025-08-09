import React from "react";
import "../css/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
        {children}
      </body>
    </html>
  );
}
