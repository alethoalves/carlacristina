import type { Metadata } from "next";
import { featuredProject as fp, profile, referenceLetter as rl } from "@/content/cv";
import "../cv/print.css";
import { Kanit, Lato } from "next/font/google";
import "./letter.css";

// Identidade da Wissentec/PLIC (mesmas fontes do plic.app.br), distinta da identidade do currículo da Carla.
const kanit = Kanit({ variable: "--font-wt-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const lato = Lato({ variable: "--font-wt-text", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Carta de referência — Wissentec",
  robots: { index: false },
};

/** Campo a preencher: destacado até ser substituído em src/content/cv.ts */
function F({ children }: { children: string }) {
  const pending = children.startsWith("[");
  return <span className={pending ? "lt-field" : undefined}>{children}</span>;
}

/** Logo da Wissentec redesenhada em vetor (gradiente verde da marca). */
function WissentecLogo() {
  return (
    <svg className="lt-logo" viewBox="0 0 414 698" aria-hidden="true">
      <defs>
        <linearGradient id="wt-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#36a17f" />
          <stop offset="1" stopColor="#0a5245" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#wt-grad)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 494 V186 L195 106 V678" />
        <path d="M290 66 L395 18 V416 L20 585 L195 678" />
      </g>
    </svg>
  );
}

export default function LetterPage() {
  return (
    <div className={`cv-root lt-root ${kanit.variable} ${lato.variable}`}>
      <a href="/carta-referencia-wissentec.pdf" download className="cv-download">
        Baixar PDF
      </a>
      <section className="sheet lt-sheet">
        <header className="lt-head">
          <div className="lt-brand-wrap">
            <WissentecLogo />
            <div>
            <p className="lt-brand">Wissentec</p>
            <p className="mono lt-brand-sub">Desenvolvedora do PLIC · Gestão de eventos acadêmicos</p>
            <p className="mono lt-brand-sub">CNPJ {rl.companyCnpj}</p>
            </div>
          </div>
          <p className="mono lt-date">
            <F>{rl.city}</F>, <F>{rl.date}</F>
          </p>
        </header>

        <div className="lt-body">
          <p className="mono lt-kicker">Carta de referência</p>
          <h1 className="lt-title">
            Recomendação profissional de <span className="lt-name">{profile.name}</span>
          </h1>

          <p>A quem possa interessar,</p>
          <p>
            Declaramos, para os devidos fins, que <strong>{profile.name}</strong> atuou junto à Wissentec — empresa
            desenvolvedora do PLIC, plataforma de gestão de eventos acadêmicos utilizada por universidades públicas e
            privadas — como <strong>{fp.role}</strong> do <strong>{fp.event}</strong>, nas <F>{rl.eventEdition}</F>.
          </p>
          <p>
            O congresso reúne <strong>mais de {fp.participants.toLocaleString("pt-BR")} participantes</strong> e esteve
            sob a gestão direta da Carla em suas principais frentes:
          </p>
          <ul className="cv-bullets lt-list">
            <li>prospecção, negociação e contratação do espaço do evento;</li>
            <li>gestão das inscrições de participantes e convidados;</li>
            <li>coordenação da equipe de hosts responsável pela recepção, credenciamento e orientação do público;</li>
            <li>acompanhamento da operação ao longo de todo o evento, do planejamento ao encerramento.</li>
          </ul>
          <p>
            Ao longo do projeto, Carla demonstrou organização, capacidade de negociação, liderança de equipe e
            comunicação clara com públicos diversos — de estudantes e pesquisadores a parceiros institucionais. Sua
            postura proativa e sua atenção aos detalhes contribuíram de forma decisiva para a boa experiência dos
            participantes.
          </p>
          <p>
            Recomendamos a Carla com convicção para posições de gestão de operações, eventos, atendimento e vendas, e
            permanecemos à disposição para quaisquer informações adicionais.
          </p>
          <p>Atenciosamente,</p>

          <div className="lt-sign">
            <div className="lt-sign-line" />
            <p className="lt-sign-name">
              <F>{rl.signerName}</F>
            </p>
            <p className="lt-sign-role">
              <F>{rl.signerRole}</F> — Wissentec
            </p>
            <p className="mono lt-sign-contact">
              <F>{rl.signerContact}</F>
            </p>
            <p className="mono lt-sign-contact">{rl.signerDirect}</p>
          </div>
        </div>

        <footer className="lt-foot mono">
          <span>Wissentec · PLIC · CNPJ {rl.companyCnpj}</span>
          <span>Referência — {profile.name}</span>
        </footer>
      </section>
    </div>
  );
}
