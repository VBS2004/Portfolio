import { Archivo, Space_Grotesk } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Venkat Balaji S | Software Engineer & ML Researcher",
  description:
    "Portfolio of Venkat Balaji S, a Software Engineer and ML Researcher specializing in GenAI, backend systems, and multi-agent AI tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${archivo.variable} ${spaceGrotesk.variable}`}>
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
