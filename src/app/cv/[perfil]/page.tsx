/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { resolveCV, TRACKS, type ResolvedExperience, type Track } from "@/content/cv";
import "../print.css";
import "./one-page.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((perfil) => ({ perfil }));
}

export const metadata: Metadata = { robots: { index: false } };

/** Currículo de 1 página, segmentado por tipo de vaga. */
export default async function OnePageCV({ params }: { params: Promise<{ perfil: Track }> }) {
  const { perfil } = await params;
  const cv = resolveCV(perfil);
  const { profile, project: fp } = cv;

  const others = [
    ...cv.others.map((o) => ({ key: o.company, name: o.company, role: o.role, period: o.period })),
    ...(!fp.main ? [{ key: fp.company, name: `${fp.company} (${fp.product})`, role: fp.role, period: fp.period || "Projeto" }] : []),
  ];

  return (
    <div className="cv-root">
      <a href={profile.pdf} download className="cv-download">
        Baixar PDF
      </a>
      <section className="sheet">
        <header className="cv-header op-header">
          <div className="cv-header-bg" />
          <img src="/img/carla-cutout-print.png" alt="Carla C. Felipe" className="cv-portrait op-portrait" />
          <div className="cv-header-shade" />
          <div className="cv-header-text op-header-text">
            <h1 className="cv-name op-name">{profile.name}</h1>
            <p className="cv-headline serif op-headline">{profile.headline}</p>
            <p className="cv-tagline op-tagline">{profile.tagline}</p>
          </div>
        </header>

        <div className="cv-contact mono">
          <span>{profile.phone}</span>
          <span>{profile.email}</span>
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </div>

        <div className="cv-body op-body">
          <main className="cv-main">
            <Block title="Perfil">
              <p className="cv-summary">{profile.summary}</p>
            </Block>

            <Block title="Experiência profissional">
              {cv.experiences.map((e) => (
                <Job key={e.company + e.start} e={e} />
              ))}
              {fp.main && (
                <article className="cv-job op-job">
                  <div className="cv-job-head">
                    <h3>
                      {fp.company} ({fp.product}) <span className="serif">— {fp.role}</span>
                    </h3>
                    <span className="mono cv-job-period">{fp.period || "Projeto"}</span>
                  </div>
                  <p className="cv-job-summary op-job-sub">{fp.event}</p>
                  <ul className="cv-bullets">
                    {fp.cvBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              )}
            </Block>

            {others.length > 0 && (
              <Block title="Outras experiências">
                <ul className="op-others">
                  {others.map((o) => (
                    <li key={o.key}>
                      <span>
                        <strong>{o.name}</strong> — {o.role}
                      </span>
                      <span className="mono">{o.period}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </main>

          <aside className="cv-side">
            <Block title="Objetivo">
              <p className="cv-side-text">{profile.objective}</p>
            </Block>
            <Block title="Competências">
              <ul className="cv-comp">
                {cv.competencies.map((c) => (
                  <li key={c.id}>
                    <strong>{c.title}</strong>
                    <span>{c.tags.slice(0, 3).join(" · ")}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Habilidades">
              <ul className="cv-list">
                {cv.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Block>
            <Block title="Ferramentas">
              <ul className="cv-chips">
                {cv.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Block>
            <Block title="Formação">
              {cv.education.map((ed) => (
                <div key={ed.title} className="cv-edu">
                  <strong>{ed.title}</strong>
                  <span>
                    {ed.institution} · <span className="mono whitespace-nowrap">{ed.period}</span>
                  </span>
                </div>
              ))}
              <p className="op-courses">Cursos: {cv.courses.join(" · ")}</p>
            </Block>
          </aside>
        </div>

        <div className="cv-footer mono">
          <span>Carla C. Felipe — {profile.headline}</span>
          <span>Referências disponíveis mediante solicitação</span>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-block">
      <h2 className="mono cv-block-title">{title}</h2>
      {children}
    </section>
  );
}

function Job({ e }: { e: ResolvedExperience }) {
  return (
    <article className="cv-job op-job">
      <div className="cv-job-head">
        <h3>
          {e.company} <span className="serif">— {e.role}</span>
        </h3>
        <span className="mono cv-job-period">{e.period}</span>
      </div>
      <ul className="cv-bullets">
        {e.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}
