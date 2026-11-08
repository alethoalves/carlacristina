import QRCode from "qrcode";
import { siteLink, type Track } from "@/content/cv";

/** QR code (SVG vetorial, nítido na impressão) para a versão online do currículo. */
export async function SiteQR({ track, className }: { track: Track | null; className?: string }) {
  const link = siteLink(track);
  if (!link) return null;
  const svg = await QRCode.toString(link.url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#1c0a06", light: "#00000000" },
  });
  return (
    <a href={link.url} className={`cv-qr ${className ?? ""}`}>
      <span className="cv-qr-code" dangerouslySetInnerHTML={{ __html: svg }} />
      <span className="cv-qr-text mono">
        <span className="cv-qr-kicker">Versão online</span>
        <span className="cv-qr-url">{link.label}</span>
      </span>
    </a>
  );
}
