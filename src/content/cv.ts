/**
 * Fonte única de conteúdo do currículo.
 *
 * Versões (segmentação por tipo de vaga):
 *   - geral   → site "/completo"    · PDF /cv (2 páginas)
 *   - vendas  → site "/vendas"      · PDF /cv/vendas (1 página)
 *   - gestao  → site "/gestao"      · PDF /cv/gestao (1 página)
 *
 * Cada bullet de experiência diz em quais versões aparece (`tracks`).
 * Cada experiência diz em quais versões é "principal" (`focus`); nas outras
 * ela aparece só como uma linha em "Outras experiências".
 *
 * Itens marcados com TODO precisam de confirmação antes da versão final.
 */

export type Track = "vendas" | "gestao";
export const TRACKS: Track[] = ["vendas", "gestao"];

/* ───────────────────────── Perfil base (versão geral) ───────────────────────── */

export const profile = {
  name: "Carla C. Felipe",
  firstName: "Carla",
  lastName: "Felipe",
  headline: "Gestão Comercial & Operações",
  roles: ["Vendas consultivas", "Gestão de operações", "Automação de atendimento"],
  location: "Goiânia — GO",
  availability: "Remoto ou híbrido",
  phone: "(62) 98101-0975",
  phoneHref: "tel:+5562981010975",
  whatsappHref:
    "https://wa.me/5562981010975?text=Ol%C3%A1%2C%20Carla!%20Vi%20seu%20curr%C3%ADculo%20e%20gostaria%20de%20conversar.",
  email: "carlacristinafelipe90@gmail.com",
  // TODO: preencher quando houver LinkedIn / domínio publicado
  linkedin: "",
  // Endereço do site publicado (sem barra no fim), ex.: "https://carlafelipe.com.br".
  // Enquanto vazio, os PDFs saem sem QR code. Para testar, rode o servidor com SITE_URL=... .
  siteUrl: process.env.SITE_URL || "https://carlacristinafelipe.com.br",
  site: "carlacristinafelipe.com.br",
  objective: "Posições de gestão comercial, vendas e gerência — em regime remoto ou híbrido.",
  tagline: "Transformo atendimento em venda, processo em rotina que funciona e equipe em resultado.",
  summary:
    "Gestora comercial e de operações com 20 anos de experiência em vendas consultivas, atendimento e administração nos setores de saúde e estética, tecnologia, varejo e serviços. Atuei como closer e fui promovida a gerente de unidade em clínica de alto padrão, onde liderei equipe, compras e rotinas administrativas, e estruturo automações de atendimento no WhatsApp que aceleram o funil de vendas. Formação em Publicidade e Propaganda.",
  about:
    "Sou a Carla: 20 anos em vendas e gestão, de closer a gerente de unidade. Cuido do cliente, organizo o processo e acompanho a meta de perto.",
  pdf: "/carla-felipe-curriculo.pdf",
};

export type Profile = typeof profile;

export const stats = [
  { value: 20, suffix: "", label: "anos de experiência", note: "desde 2006" },
  { value: 8, suffix: "", label: "empresas em que atuei", note: "do varejo à tecnologia" },
  { value: 4, suffix: "", label: "segmentos de mercado", note: "saúde · tech · varejo · serviços" },
];

/* ───────────────────────── Competências ───────────────────────── */

export type Competency = {
  id: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
};

export const competencies: Competency[] = [
  {
    id: "vendas",
    title: "Vendas consultivas",
    short: "Closer · Inside Sales",
    description:
      "Condução do funil de ponta a ponta: qualificação de leads, avaliação, orçamento personalizado, negociação e fechamento — com pós-venda que gera recorrência.",
    tags: ["Funil de vendas", "Negociação", "Fechamento", "Pós-venda", "Jornada do Paciente"],
  },
  {
    id: "operacoes",
    title: "Gestão de operações",
    short: "Unidade · Equipe · Processos",
    description:
      "Gestão de unidade e de pessoas, rotinas administrativas, compras, estoque, fornecedores, manutenção e conformidade documental para a operação não parar.",
    tags: ["Liderança de equipes", "Compras e estoque", "Fornecedores", "Conformidade"],
  },
  {
    id: "automacao",
    title: "Automação de processos",
    short: "WhatsApp · CRM",
    description:
      "Criação de fluxos automatizados de atendimento no WhatsApp: triagem, qualificação, follow-ups e integração com o CRM — mais velocidade na resposta e menos lead perdido.",
    tags: ["Fluxos de WhatsApp", "Chatbots", "CRM Kinbox", "Follow-up automático"],
  },
  {
    id: "social",
    title: "Social media & engajamento",
    short: "Conteúdo · Comunidade",
    description:
      "Planejamento e gestão de redes sociais com foco em engajamento e vendas: calendário editorial, produção de fotos e vídeos, copy e relacionamento com a audiência.",
    tags: ["Calendário editorial", "Instagram", "Fotos e vídeos", "Copywriting"],
  },
  {
    id: "dados",
    title: "Dados & Excel avançado",
    short: "Controle · Indicadores",
    description:
      "Planilhas e painéis para acompanhar metas, vendas, estoque e pagamentos: tabelas dinâmicas, PROCX, fórmulas condicionais e dashboards de indicadores.",
    tags: ["Tabelas dinâmicas", "PROCX / PROCV", "Dashboards", "Controle financeiro"],
  },
];

// TODO: confirmar a lista final de ferramentas com a Carla
export const tools = [
  "Excel avançado",
  "CRM Kinbox",
  "WhatsApp Business",
  "Automação de fluxos",
  "Google Workspace",
  "Meta Business Suite",
  "Instagram",
  "Canva",
];

export const skillsCore = [
  "Gestão comercial remota",
  "Inside Sales",
  "Atendimento consultivo",
  "Liderança de equipes",
  "Negociação e fechamento",
  "Automação de WhatsApp",
  "Excel avançado",
  "Compras e estoque",
];

/* ───────────────────────── Experiências ───────────────────────── */

export type Bullet = { text: string; tracks: Track[] };

export type Experience = {
  company: string;
  role: string;
  period: string;
  start: string; // AAAA-MM, para ordenação
  sector: string;
  summary: string;
  bullets: Bullet[];
  /** Versões em que esta experiência aparece completa. */
  focus: Track[];
  highlight?: boolean;
};

const V: Track[] = ["vendas"];
const G: Track[] = ["gestao"];
const VG: Track[] = ["vendas", "gestao"];

export const experiences: Experience[] = [
  {
    company: "ELO",
    role: "Gerente de Unidade & Closer",
    period: "10/2025 — 06/2026",
    start: "2025-10",
    sector: "Saúde & estética",
    summary:
      "Promovida a gerente após a aquisição da Stanley's Hair pela ELO, à frente das operações administrativas, comerciais e de atendimento da unidade.",
    bullets: [
      { text: "Gestão do funil de vendas no CRM Kinbox: acompanhamento de leads, follow-ups estratégicos e conversão de pacientes.", tracks: VG },
      { text: "Avaliações iniciais online, orçamentos personalizados e definição de protocolos para cada paciente.", tracks: V },
      { text: "Liderança da equipe médica e de colaboradores; controle de suprimentos, estoque, manutenção predial e logística.", tracks: G },
      { text: "Coordenação das rotinas administrativas com conformidade documental e suporte às exigências regulatórias.", tracks: G },
    ],
    focus: VG,
    highlight: true,
  },
  {
    company: "Stanley's Hair",
    role: "Closer de Vendas",
    period: "07/2025 — 10/2025",
    start: "2025-07",
    sector: "Saúde & estética",
    summary:
      "Atendimento consultivo e fechamento de vendas em clínica de alto padrão; posteriormente promovida à gerência da unidade.",
    bullets: [
      { text: "Negociações e fechamentos alinhados às necessidades de cada paciente.", tracks: VG },
      { text: "Aplicação da metodologia Jornada do Paciente em todo o processo comercial.", tracks: V },
      { text: "Relacionamento estratégico para fidelização e experiência do cliente.", tracks: V },
    ],
    focus: V,
  },
  {
    company: "Reposit Tecnologia",
    role: "Atendimento ao Cliente & CRM",
    period: "06/2024 — 05/2025",
    start: "2024-06",
    sector: "Tecnologia",
    summary:
      "Atendimento e suporte multicanal, fazendo a ponte entre clientes e analistas para resolver solicitações com agilidade.",
    bullets: [
      { text: "Abertura e acompanhamento de chamados, orientando clientes sobre tratativas e processos.", tracks: VG },
      { text: "Conciliação de informações e apoio na resolução de incidências operacionais.", tracks: G },
      { text: "Gestão do relacionamento com foco em qualidade de atendimento e satisfação do usuário.", tracks: V },
    ],
    focus: V,
  },
  {
    company: "Sá Chica Bijux",
    role: "Gerente Administrativa & Social Media",
    period: "06/2022 — 04/2024",
    start: "2022-06",
    sector: "Varejo",
    summary: "Gestão da equipe e da operação da loja, somada ao planejamento das redes sociais da marca.",
    bullets: [
      { text: "Gestão de equipe, organização de atividades e acompanhamento de resultados.", tracks: G },
      { text: "Administração de compras e controle de mercadorias.", tracks: G },
      { text: "Planejamento e gestão das mídias sociais com foco em engajamento e vendas.", tracks: VG },
    ],
    focus: G,
  },
  {
    company: "Casa Virtue",
    role: "Consultora de Vendas",
    period: "04/2020 — 03/2022",
    start: "2020-04",
    sector: "Varejo",
    summary: "Venda consultiva em todas as etapas da jornada de compra, com foco em recorrência.",
    bullets: [
      { text: "Identificação de necessidades e oferta de soluções adequadas a cada cliente.", tracks: V },
      { text: "Negociação, fechamento e ações de relacionamento e fidelização no pós-venda.", tracks: V },
    ],
    focus: V,
  },
  {
    company: "DUO47 Roupas Femininas",
    role: "Administração & Vendas",
    period: "10/2017 — 02/2020",
    start: "2017-10",
    sector: "Varejo de moda",
    summary:
      "Integração entre administrativo e comercial, com produção de conteúdo para os canais digitais da marca.",
    bullets: [
      { text: "Gestão de compras e organização dos processos internos.", tracks: G },
      { text: "Produção de conteúdo, fotos e vídeos para site e redes sociais.", tracks: V },
    ],
    focus: G,
  },
  {
    company: "Studio Fogo em BH",
    role: "Gestão de Agenda & Compras",
    period: "06/2013 — 04/2017",
    start: "2013-06",
    sector: "Serviços",
    summary: "Organização da agenda de clientes, pagamentos e compras para o estúdio funcionar sem atritos.",
    bullets: [
      { text: "Gestão de agenda e compromissos; controle de pagamentos e obrigações financeiras.", tracks: G },
      { text: "Compras, suporte operacional e gestão do Instagram do estúdio.", tracks: G },
    ],
    focus: G,
  },
  {
    company: "Clínica Saúde Estética",
    role: "Consultora de Vendas",
    period: "05/2006 — 03/2013",
    start: "2006-05",
    sector: "Saúde & estética",
    summary: "Prospecção, venda consultiva e fidelização de clientes durante quase 7 anos.",
    bullets: [
      { text: "Captação e prospecção de novos clientes; apresentação de soluções e fechamento.", tracks: V },
      { text: "Análise de mercado e estratégias de conversão e fidelização.", tracks: V },
    ],
    focus: V,
  },
];

/* ───────────────────────── Formação ───────────────────────── */

export const education = [
  { title: "Publicidade e Propaganda", institution: "Universidade Católica de Brasília", period: "2010 — 2013", kind: "Graduação" },
];

export const courses = ["Jornada do Paciente", "Curso de Redação"];

/* ───────────────────────── Versões por tipo de vaga ───────────────────────── */

type TrackConfig = {
  label: string;
  profile: Partial<Profile>;
  competencies: string[]; // ids, na ordem de exibição
  tools: string[];
  skills: string[];
  stats: typeof stats;
};

export const trackConfig: Record<Track, TrackConfig> = {
  vendas: {
    label: "Vendas",
    profile: {
      headline: "Vendas Consultivas & Inside Sales",
      roles: ["Closer", "Inside Sales", "CRM & automação"],
      tagline: "Do primeiro contato ao fechamento: atendimento consultivo que converte e fideliza.",
      about:
        "Sou a Carla: 20 anos em vendas consultivas, de consultora a closer em clínica de alto padrão. Qualifico, negocio, fecho — e cuido do pós-venda.",
      summary:
        "Profissional de vendas consultivas com 20 anos de experiência em saúde e estética, varejo e tecnologia. Atuei como closer em clínica de alto padrão, com gestão do funil no CRM Kinbox, follow-ups estratégicos e automação de atendimento no WhatsApp, e fui promovida a gerente da unidade.",
      objective: "Vagas de vendas consultivas, closer, inside sales e coordenação comercial — remoto ou híbrido.",
      pdf: "/carla-felipe-curriculo-vendas.pdf",
    },
    competencies: ["vendas", "automacao", "dados", "social"],
    tools: ["CRM Kinbox", "WhatsApp Business", "Automação de fluxos", "Excel avançado", "Meta Business Suite", "Instagram", "Google Workspace"],
    skills: ["Inside Sales", "Negociação e fechamento", "Atendimento consultivo", "Gestão de funil (CRM)", "Follow-up e pós-venda", "Automação de WhatsApp"],
    stats: [
      { value: 20, suffix: "", label: "anos em vendas e atendimento", note: "desde 2006" },
      { value: 5, suffix: "", label: "empresas com venda consultiva", note: "saúde · varejo · moda" },
      { value: 7, suffix: "", label: "anos de prospecção em clínica", note: "Clínica Saúde Estética" },
    ],
  },
  gestao: {
    label: "Gestão",
    profile: {
      headline: "Gestão de Operações & Unidade",
      roles: ["Gestão de unidade", "Operações & compras", "Liderança de equipes"],
      tagline: "Equipe alinhada, processo organizado e operação que não para.",
      about:
        "Sou a Carla: gestora de unidade e operações. Lidero equipes, organizo rotinas, compras e estoque.",
      summary:
        "Gestora de operações com experiência em gerência de unidade, liderança de equipes, compras, estoque e rotinas administrativas em saúde, varejo e serviços. Na ELO, geri equipe, suprimentos, manutenção e conformidade de uma clínica de alto padrão.",
      objective: "Vagas de gerência, coordenação administrativa e operações — remoto ou híbrido.",
      pdf: "/carla-felipe-curriculo-gestao.pdf",
    },
    competencies: ["operacoes", "vendas", "dados", "automacao"],
    tools: ["Excel avançado", "Google Workspace", "CRM Kinbox", "WhatsApp Business", "Automação de fluxos"],
    skills: ["Liderança de equipes", "Compras e estoque", "Rotinas administrativas", "Gestão de fornecedores", "Conformidade documental", "Controle financeiro"],
    stats: [
      { value: 20, suffix: "", label: "anos de experiência", note: "desde 2006" },
      { value: 4, suffix: "", label: "cargos de gestão e administração", note: "ELO · Sá Chica · DUO47 · Studio Fogo" },
      { value: 3, suffix: "", label: "setores de atuação", note: "saúde · varejo · serviços" },
    ],
  },
};

/* ───────────────────────── Link do site por versão ───────────────────────── */

/** Página do site que corresponde a cada PDF (o QR code aponta para ela). */
export function siteLink(track: Track | null): { url: string; label: string } | null {
  if (!profile.siteUrl) return null;
  const url = `${profile.siteUrl}/${track ?? "completo"}`;
  return { url, label: url.replace(/^https?:\/\//, "") };
}

/* ───────────────────────── Resolução por versão ───────────────────────── */

export type ResolvedExperience = Omit<Experience, "bullets"> & { bullets: string[] };

export type ResolvedCV = {
  track: Track | null;
  profile: Profile;
  stats: typeof stats;
  competencies: Competency[];
  tools: string[];
  skills: string[];
  experiences: ResolvedExperience[]; // completas
  others: ResolvedExperience[]; // só uma linha
  education: typeof education;
  courses: string[];
};

export function resolveCV(track: Track | null = null): ResolvedCV {
  if (!track) {
    return {
      track: null,
      profile,
      stats,
      competencies,
      tools,
      skills: skillsCore,
      experiences: experiences.map((e) => ({ ...e, bullets: e.bullets.map((b) => b.text) })),
      others: [],
      education,
      courses,
    };
  }
  const cfg = trackConfig[track];
  const toResolved = (e: Experience): ResolvedExperience => ({
    ...e,
    bullets: e.bullets.filter((b) => b.tracks.includes(track)).map((b) => b.text),
  });
  return {
    track,
    profile: { ...profile, ...cfg.profile },
    stats: cfg.stats,
    competencies: cfg.competencies.map((id) => competencies.find((c) => c.id === id)!).filter(Boolean),
    tools: cfg.tools,
    skills: cfg.skills,
    experiences: experiences.filter((e) => e.focus.includes(track)).map(toResolved),
    others: experiences.filter((e) => !e.focus.includes(track)).map(toResolved),
    education,
    courses,
  };
}
