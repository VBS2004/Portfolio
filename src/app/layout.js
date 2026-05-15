import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Venkat Balaji S | ML & AI Engineer",
  description:
    "Portfolio of Venkat Balaji S, a Software Engineer and ML Researcher specializing in PyTorch, GenAI, and Backend Infrastructure.",
};

import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1, overflowX: "hidden" }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
