import type { ManhuaItem } from "../types/manhua";

type LibraryPageProps = {
  manhuas: ManhuaItem[];
  onEditBulk: () => void;
  onEditSingle: (item: ManhuaItem) => void;
  onCreateShelf: () => void;
  onToggleFavorite: (id: string) => void;
  onDeleteManhua: (id: string) => void;
};

export default function Library({
  manhuas,
  onEditBulk,
  onEditSingle,
  onCreateShelf,
  onToggleFavorite,
  onDeleteManhua
}: LibraryPageProps) {
  const sortedManhuas = [...manhuas].sort((a, b) => {
    if (a.favorite === b.favorite) {
      return a.name.localeCompare(b.name);
    }

    return a.favorite ? -1 : 1;
  });

  return (
    <section className="library-page">
      <div className="library-hero">
        <div>
          <p className="eyebrow">Biblioteca completa</p>
          <h1>Suas estantes, do seu jeito.</h1>
          <p className="lead">
            Veja todos os manhuas cadastrados, edite em lote ou ajuste um por
            vez quando quiser.
          </p>
        </div>
        <div className="library-toolbar">
          <button className="btn btn-light" onClick={onCreateShelf}>
            Adicionar manhuas
          </button>
          <button className="btn btn-primary" onClick={onEditBulk}>
            Editar em lote
          </button>
        </div>
      </div>

      <div className="library-grid">
        {sortedManhuas.map((item, index) => (
          <article className="library-item" key={item.id}>
            <div className="library-cover">
              <span className={`series-cover tone-${(index % 4) + 1}`} />
            </div>
            <div className="library-content">
              <div className="library-meta">
                <h3>{item.name}</h3>
                <div className="library-tags">
                  {item.favorite ? (
                    <span className="library-tag library-favorite">Favorito</span>
                  ) : null}
                  <span className="library-tag">{item.status}</span>
                </div>
              </div>
              <p className="library-sub">
                Cap. {item.currentChapter} / {item.totalChapters}
              </p>
              <p className="library-desc">
                {item.description || "Sem descrição por enquanto."}
              </p>
            </div>
            <div className="library-actions">
              <button
                className={`icon-btn${item.favorite ? " is-active" : ""}`}
                onClick={() => onToggleFavorite(item.id)}
                aria-pressed={item.favorite}
                aria-label={item.favorite ? "Desfavoritar" : "Favoritar"}
              >
                {item.favorite ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.8 6.7 19.6l1-5.8-4.2-4.1 5.9-.9L12 3.5z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.8 6.7 19.6l1-5.8-4.2-4.1 5.9-.9L12 3.5z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </button>
              <button
                className="icon-btn"
                onClick={() => onEditSingle(item)}
                aria-label="Editar manhua"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 16.5V20h3.5L18 9.5l-3.5-3.5L4 16.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 6l3.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="icon-btn danger"
                onClick={() => onDeleteManhua(item.id)}
                aria-label="Remover manhua"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 7h12M9 7V5h6v2m-7 4v7m4-7v7m4-7v7M7 7l1 13h8l1-13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
