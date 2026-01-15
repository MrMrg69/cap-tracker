import StatCard from "../components/StatCard";
import type { ManhuaItem, StatItem } from "../types/manhua";

type HomePageProps = {
  stats: StatItem[];
  note: string | null;
  recentManhuas: ManhuaItem[];
  onCreateShelf: () => void;
  onImportList: () => void;
  onEditRecent: () => void;
  onExplore: (title: string) => void;
};

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

export default function Home({
  stats,
  note,
  recentManhuas,
  onCreateShelf,
  onImportList,
  onEditRecent,
  onExplore
}: HomePageProps) {
  return (
    <>
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
            <button className="btn btn-primary" onClick={onCreateShelf}>
              Criar minha estante
            </button>
            <button className="btn btn-light" onClick={onImportList}>
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
            <div className="library-subtitle">Últimos atualizados</div>
            <div className="shelf-grid">
              {recentManhuas.length === 0 ? (
                <p className="cap-sub">Sem manhuas ainda.</p>
              ) : (
                recentManhuas.map((item, index) => (
                  <div className="series-item" key={item.id}>
                    <span className={`series-cover tone-${(index % 4) + 1}`} />
                    <div>
                      <p className="series-title">
                        {item.name}
                        {item.favorite ? (
                          <span className="series-badge">Favorito</span>
                        ) : null}
                      </p>
                      <p className="series-sub">
                        Cap. {item.currentChapter} / {item.totalChapters} -{" "}
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cap-foot">
              <div>
                <p className="cap-label">Últimos lidos</p>
                <p className="cap-value">{recentManhuas.length} hoje</p>
              </div>
              <button
                className="btn btn-primary btn-compact"
                onClick={onEditRecent}
              >
                Editar estante
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
                onClick={() => onExplore(feature.title)}
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
    </>
  );
}
