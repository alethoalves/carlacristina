import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Carla Felipe — Gestão Comercial & Operações",
  description:
    "Currículo de Carla C. Felipe: 20 anos em vendas consultivas, gestão de operações e automação de atendimento. Disponível para remoto ou híbrido.",
  openGraph: {
    title: "Carla Felipe — Gestão Comercial & Operações",
    description:
      "Vendas consultivas, gestão de unidade, liderança de equipes e automação de WhatsApp.",
    images: ["/img/carla-portrait.jpg"],
    locale: "pt_BR",
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0907",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
