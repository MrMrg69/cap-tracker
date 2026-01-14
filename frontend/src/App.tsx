import { useEffect, useState } from "react";
import "./styles/app.css";
import StatCard from "./components/StatCard";

const stats = [
  { label: "Capítulos lidos", value: "1.248", trend: "+23 na semana" },
  { label: "Séries ativas", value: "12", trend: "3 em hiato" },
  { label: "Capítulos marcados", value: "4", trend: "2 favoritos" }
];

const initialSeries = [
  { title: "Moonlit Contract", chapter: "Cap. 89", status: "Em dia" },
  { title: "Lotus Noir", chapter: "Cap. 52", status: "Atrasado" },
  { title: "Azure Blade", chapter: "Cap. 17", status: "Novo" },
  { title: "City of Jade", chapter: "Cap. 204", status: "Em dia" }
];

const importedSeries = [
  { title: "Crimson Pact", chapter: "Cap. 13", status: "Novo" },
  { title: "Silver Harbor", chapter: "Cap. 77", status: "Em dia" }
];

const features = [
  {
    title: "Prateleiras vivas",
    detail: "Monte estantes por gênero, humor ou fase e compartilhe."
  },
  {
    title: "Check-ins de capítulo",
    detail: "Marque manualmente o que leu e registre seu progresso."
  },
  {
    title: "Ritmo inteligente",
    detail: "Sugestões de leitura com base no seu tempo e hábito."
  }
];

const activities = [
  {
    title: "Você marcou como lido: Moonlit Contract",
    detail: "Capítulo 89 salvo no seu histórico."
  },
  {
    title: "Atualização manual: Lotus Noir",
    detail: "Capítulo 53 registrado por você há 2h."
  },
  {
    title: "Nova lista: Manhuas de inverno",
    detail: "Criada por Lani. 8 títulos em comum."
  }
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [note, setNote] = useState<string | null>(null);
  const [series, setSeries] = useState(initialSeries);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const handleCreateShelf = () => {
    setNote("Estante criada. Agora adicione suas séries manualmente.");
  };

  const handleImportList = () => {
    setSeries((current) =>
      current.length > initialSeries.length
        ? current
        : [...current, ...importedSeries]
    );
    setNote("Lista importada. Revise e ajuste os capítulos manualmente.");
  };

  const handleOpenShelf = () => {
    document.getElementById("biblioteca")?.scrollIntoView({ behavior: "smooth" });
    setNote("Abrindo sua estante local.");
  };

  const handleExplore = (title: string) => {
    setNote(`Explorar "${title}" em breve.`);
  };

  const handleLogin = () => {
    setNote("Login local em breve. Por enquanto, o foco é seu controle manual.");
  };

  const handleAccess = () => {
    setNote("Acesso solicitado. Vamos te chamar quando abrir convites.");
  };

  const handleCommunity = () => {
    setNote("Comunidade em construção. Em breve abrimos o Discord.");
  };

  const handleThemeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">MH</span>
          <span className="brand-name">Manhua Hub</span>
        </div>
        <nav className="nav">
          <a href="#biblioteca">Biblioteca</a>
          <a href="#descobrir">Descobrir</a>
          <a href="#colecoes">Coleções</a>
          <a href="#comunidade">Comunidade</a>
        </nav>
        <div className="topbar-actions">
          <button
            className="btn btn-ghost theme-toggle"
            onClick={handleThemeToggle}
            aria-pressed={theme === "dark"}
            type="button"
          >
            {theme === "dark" ? "Tema claro" : "Tema escuro"}
          </button>
          <button className="btn btn-ghost" onClick={handleLogin} type="button">
            Entrar
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="biblioteca">
          <div className="hero-copy">
            <p className="eyebrow reveal">Seu hub de manhuas</p>
            <h1 className="reveal delay-1">
              Organize sua lista, capítulo por capítulo.
            </h1>
            <p className="lead reveal delay-2">
              Crie estantes personalizadas e marque manualmente o que você leu,
              mantendo o ritmo das suas séries favoritas em um só lugar.
            </p>
            <div className="hero-actions reveal delay-3">
              <button className="btn btn-primary" onClick={handleCreateShelf}>
                Criar minha estante
              </button>
              <button className="btn btn-light" onClick={handleImportList}>
                Importar lista
              </button>
            </div>
            {note ? (
              <p className="action-note" aria-live="polite">
                {note}
              </p>
            ) : null}
            <div className="signal-row reveal delay-4">
              <span>Atualização manual</span>
              <span>Progresso por capítulo</span>
              <span>Listas pessoais</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="library-card">
              <div className="library-header">
                <div>
                  <p className="cap-title">Sua biblioteca agora</p>
                  <p className="cap-sub">Atualizada por você há 5 min</p>
                </div>
                <span className="status-pill">Manual</span>
              </div>
              <div className="cap-body">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
              <div className="series-list">
                {series.map((item, index) => (
                  <div className="series-item" key={item.title}>
                    <span className={`series-cover tone-${index + 1}`} />
                    <div>
                      <p className="series-title">{item.title}</p>
                      <p className="series-sub">
                        {item.chapter} - {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cap-foot">
                <div>
                  <p className="cap-label">Continuar leitura</p>
                  <p className="cap-value">3 hoje</p>
                </div>
                <button
                  className="btn btn-primary btn-compact"
                  onClick={handleOpenShelf}
                >
                  Abrir estante
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid-section" id="descobrir">
          <div className="section-head">
            <h2>Uma casa para seu ritual de leitura.</h2>
            <p>
              Aqui você registra seu progresso manualmente, sem depender de APIs
              externas para dizer o que mudou.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
                <button
                  className="btn btn-link"
                  onClick={() => handleExplore(feature.title)}
                >
                  Explorar
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline" id="colecoes">
          <div className="timeline-card">
            <div>
              <p className="eyebrow">Registro recente</p>
              <h2>Seu feed de leitura vive aqui.</h2>
            </div>
            <div className="timeline-list">
              {activities.map((activity) => (
                <div key={activity.title}>
                  <p className="timeline-title">{activity.title}</p>
                  <p>{activity.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="comunidade">
        <div>
          <p className="footer-title">Manhua Hub</p>
          <p>Seu manhua, seu ritmo.</p>
        </div>
        <div className="footer-actions">
          <button className="btn btn-primary" onClick={handleAccess}>
            Pedir acesso
          </button>
          <button className="btn btn-ghost" onClick={handleCommunity}>
            Entrar no Discord
          </button>
        </div>
      </footer>
    </div>
  );
}
