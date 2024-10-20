
import type { Metadata } from "next";
import "./globals.css";
import ChatbotHeader from "@/components/ChatbotHeader";
import "./ChatbotBackgroundImage.css";

export const metadata: Metadata = {
  title: "Budy",
  description: "Tu amigo inteligente de confianza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="ChatbotBackgroundImage">
        <ChatbotHeader />
        {children}
      </body>
    </html>
  );
}
