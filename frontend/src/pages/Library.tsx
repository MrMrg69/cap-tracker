import type { ManhuaItem } from "../types/manhua";

type LibraryPageProps = {
  manhuas: ManhuaItem[];
  onEditBulk: () => void;
  onEditSingle: (item: ManhuaItem) => void;
  onCreateShelf: () => void;
};

export default function Library({
  manhuas,
  onEditBulk,
  onEditSingle,
  onCreateShelf
}: LibraryPageProps) {
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
        {manhuas.map((item, index) => (
          <article className="library-item" key={item.id}>
            <div className="library-cover">
              <span className={`series-cover tone-${(index % 4) + 1}`} />
            </div>
            <div className="library-content">
              <div className="library-meta">
                <h3>{item.name}</h3>
                <span className="library-tag">{item.status}</span>
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
                className="btn btn-ghost btn-compact"
                onClick={() => onEditSingle(item)}
              >
                Editar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
