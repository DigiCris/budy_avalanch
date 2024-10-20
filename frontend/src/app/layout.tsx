import type { Metadata } from "next";
import "./globals.css";
import "./ChatbotBackgroundImage.css";
import HeaderSelector from "@/components/HeaderSelector";

export const metadata: Metadata = {
  title: "Budy",
  description: "Tu amigo inteligente de confianza.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="ChatbotBackgroundImage">
        <HeaderSelector />
        {children}
      </body>
    </html>
  );
}
