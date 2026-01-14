import "./styles/app.css";
import StatCard from "./components/StatCard";

const stats = [
  { label: "Capítulos lidos", value: "1.248", trend: "+23 na semana" },
  { label: "Séries ativas", value: "12", trend: "3 em hiato" },
  { label: "Lançamentos hoje", value: "4", trend: "2 favoritos" }
];

const series = [
  { title: "Moonlit Contract", chapter: "Cap. 89", status: "Em dia" },
  { title: "Lotus Noir", chapter: "Cap. 52", status: "Atrasado" },
  { title: "Azure Blade", chapter: "Cap. 17", status: "Novo" },
  { title: "City of Jade", chapter: "Cap. 204", status: "Em dia" }
];

const features = [
  {
    title: "Prateleiras vivas",
    detail: "Monte estantes por gênero, humor ou fase e compartilhe."
  },
  {
    title: "Alertas de capítulo",
    detail: "Sinalize lançamentos e receba notificações do que importa."
  },
  {
    title: "Ritmo inteligente",
    detail: "Sugestões de leitura com base no seu tempo e hábito."
  }
];

const activities = [
  {
    title: "Continuar: Moonlit Contract",
    detail: "Você parou no capítulo 89. O 90 saiu hoje."
  },
  {
    title: "Atualização: Lotus Noir",
    detail: "Capítulo 53 liberado há 2h."
  },
  {
    title: "Nova lista: Manhuas de inverno",
    detail: "Criada por Lani. 8 títulos em comum."
  }
];

export default function App() {
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
        <button className="btn btn-ghost">Entrar</button>
      </header>

      <main>
        <section className="hero" id="biblioteca">
          <div className="hero-copy">
              <p className="eyebrow reveal">Seu hub de manhuas</p>
            <h1 className="reveal delay-1">
              Organize, acompanhe, sinta cada capítulo.
            </h1>
            <p className="lead reveal delay-2">
              Crie estantes personalizadas, acompanhe lançamentos e guarde o
              ritmo das suas séries favoritas em um só lugar.
            </p>
            <div className="hero-actions reveal delay-3">
              <button className="btn btn-primary">Criar minha estante</button>
              <button className="btn btn-light">Importar lista</button>
            </div>
            <div className="signal-row reveal delay-4">
              <span>Alertas de lançamento</span>
              <span>Progresso por capítulo</span>
              <span>Listas compartilhadas</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="library-card">
              <div className="library-header">
                <div>
                  <p className="cap-title">Sua biblioteca agora</p>
                  <p className="cap-sub">Atualizada há 5 min</p>
                </div>
                <span className="status-pill">Sincronizado</span>
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
                <button className="btn btn-primary btn-compact">
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
              O hub nasce para deixar cada manhua no lugar certo e te puxar de
              volta quando um novo capítulo cair.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
                <button className="btn btn-link">Explorar</button>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline" id="colecoes">
          <div className="timeline-card">
            <div>
              <p className="eyebrow">Movimento recente</p>
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
          <button className="btn btn-primary">Pedir acesso</button>
          <button className="btn btn-ghost">Entrar no Discord</button>
        </div>
      </footer>
    </div>
  );
}
