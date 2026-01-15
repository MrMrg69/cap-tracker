import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import type { ManhuaItem, StatItem } from "./types/manhua";
import "./styles/app.css";

type ShelfFormItem = {
  id?: string;
  name: string;
  description: string;
  totalChapters: string;
  currentChapter: string;
};

const initialManhuas: ManhuaItem[] = [
  {
    id: "moonlit-contract",
    name: "Moonlit Contract",
    description: "Romance intenso com contratos e reviravoltas.",
    totalChapters: 120,
    currentChapter: 89,
    status: "Manual"
  },
  {
    id: "lotus-noir",
    name: "Lotus Noir",
    description: "Intriga urbana com magia e mistério.",
    totalChapters: 80,
    currentChapter: 52,
    status: "Manual"
  },
  {
    id: "azure-blade",
    name: "Azure Blade",
    description: "Jornada de espadas e clãs rivais.",
    totalChapters: 60,
    currentChapter: 17,
    status: "Manual"
  },
  {
    id: "city-of-jade",
    name: "City of Jade",
    description: "Cultivo e política em uma cidade lendária.",
    totalChapters: 240,
    currentChapter: 204,
    status: "Manual"
  }
];

const importedManhuas: ManhuaItem[] = [
  {
    id: "crimson-pact",
    name: "Crimson Pact",
    description: "",
    totalChapters: 90,
    currentChapter: 13,
    status: "Importado"
  },
  {
    id: "silver-harbor",
    name: "Silver Harbor",
    description: "",
    totalChapters: 110,
    currentChapter: 77,
    status: "Importado"
  }
];

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [note, setNote] = useState<string | null>(null);
  const [manhuas, setManhuas] = useState<ManhuaItem[]>(initialManhuas);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [shelfMode, setShelfMode] = useState<"create" | "edit">("create");
  const [shelfStep, setShelfStep] = useState<"count" | "form">("count");
  const [shelfCount, setShelfCount] = useState(1);
  const [shelfItems, setShelfItems] = useState<ShelfFormItem[]>([]);
  const [shelfError, setShelfError] = useState<string | null>(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const stats = useMemo<StatItem[]>(() => {
    const totalRead = manhuas.reduce(
      (acc, item) => acc + item.currentChapter,
      0
    );
    const format = (value: number) =>
      new Intl.NumberFormat("pt-BR").format(value);

    return [
      { label: "Capítulos lidos", value: format(totalRead), trend: "+23 na semana" },
      {
        label: "Séries ativas",
        value: String(manhuas.length),
        trend: manhuas.length > 0 ? "3 em hiato" : "Comece sua estante"
      },
      { label: "Capítulos marcados", value: "4", trend: "2 favoritos" }
    ];
  }, [manhuas]);

  const recentManhuas = useMemo(
    () => manhuas.slice(0, 5),
    [manhuas]
  );

  const openShelfEdit = (items: ManhuaItem[]) => {
    setShelfMode("edit");
    setShelfError(null);
    setShelfStep("form");
    setShelfItems(
      items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        totalChapters: String(item.totalChapters),
        currentChapter: String(item.currentChapter)
      }))
    );
    setIsShelfOpen(true);
  };

  const handleCreateShelf = () => {
    setShelfMode("create");
    setShelfError(null);
    setShelfCount(1);
    setShelfItems([]);
    setShelfStep("count");
    setIsShelfOpen(true);
  };

  const handleImportList = () => {
    setManhuas((current) =>
      current.length > initialManhuas.length
        ? current
        : [...current, ...importedManhuas]
    );
    setNote("Lista importada. Revise e ajuste os capítulos manualmente.");
  };

  const handleEditRecent = () => {
    if (recentManhuas.length === 0) {
      setNote("Sua estante está vazia. Vamos criar a primeira?");
      handleCreateShelf();
      return;
    }

    openShelfEdit(recentManhuas);
  };

  const handleEditAll = () => {
    if (manhuas.length === 0) {
      setNote("Sua estante está vazia. Vamos criar a primeira?");
      handleCreateShelf();
      return;
    }

    openShelfEdit(manhuas);
  };

  const handleEditSingle = (item: ManhuaItem) => {
    openShelfEdit([item]);
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

  const handleCloseShelf = () => {
    setIsShelfOpen(false);
    setShelfError(null);
  };

  const handleConfirmCount = () => {
    const count = Math.max(1, Math.min(12, shelfCount));
    const items = Array.from({ length: count }, () => ({
      name: "",
      description: "",
      totalChapters: "",
      currentChapter: ""
    }));
    setShelfItems(items);
    setShelfStep("form");
  };

  const handleShelfChange = (
    index: number,
    field: keyof ShelfFormItem,
    value: string
  ) => {
    setShelfItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  };

  const validateShelfItems = (items: ShelfFormItem[]) => {
    if (items.length === 0) {
      return "Adicione pelo menos um manhua para salvar.";
    }

    const hasMissingName = items.some((item) => item.name.trim() === "");
    const hasMissingTotal = items.some((item) => item.totalChapters === "");
    if (hasMissingName || hasMissingTotal) {
      return "Preencha todos os campos obrigatórios.";
    }

    const parsedTotals = items.map((item) => Number(item.totalChapters));
    if (parsedTotals.some((value) => Number.isNaN(value) || value <= 0)) {
      return "Total de capítulos deve ser um número acima de zero.";
    }

    const parsedCurrents = items.map((item) =>
      item.currentChapter === "" ? null : Number(item.currentChapter)
    );
    if (
      parsedCurrents.some(
        (value) => value !== null && (Number.isNaN(value) || value < 0)
      )
    ) {
      return "Capítulo atual precisa ser zero ou maior.";
    }

    return null;
  };

  const hasMissingRequired = shelfItems.some(
    (item) => item.name.trim() === "" || item.totalChapters === ""
  );

  const shouldHighlightRequired =
    shelfError === "Preencha todos os campos obrigatórios." && hasMissingRequired;

  const isMissingRequiredField = (
    item: ShelfFormItem,
    field: "name" | "totalChapters"
  ) => {
    if (!shouldHighlightRequired) {
      return false;
    }

    return field === "name"
      ? item.name.trim() === ""
      : item.totalChapters === "";
  };

  const handleSaveShelf = () => {
    const validationError = validateShelfItems(shelfItems);
    if (validationError) {
      setShelfError(validationError);
      return;
    }

    if (shelfMode === "edit") {
      setManhuas((current) =>
        current.map((item) => {
          const formItem = shelfItems.find((entry) => entry.id === item.id);
          if (!formItem) {
            return item;
          }

          const total = Number(formItem.totalChapters);
          const currentChapter =
            formItem.currentChapter === ""
              ? item.currentChapter
              : Number(formItem.currentChapter);
          const safeCurrent = Math.min(currentChapter, total);

          return {
            ...item,
            name: formItem.name.trim(),
            description: formItem.description.trim(),
            totalChapters: total,
            currentChapter: safeCurrent
          };
        })
      );

      setNote("Estante atualizada com sucesso.");
      setIsShelfOpen(false);
      return;
    }

    const parsedTotals = shelfItems.map((item) => Number(item.totalChapters));
    const parsedCurrents = shelfItems.map((item) =>
      item.currentChapter === "" ? null : Number(item.currentChapter)
    );

    let lastFilled = 0;
    const mappedManhuas: ManhuaItem[] = shelfItems.map((item, index) => {
      const total = parsedTotals[index];
      const currentBase =
        parsedCurrents[index] === null
          ? index === 0 && lastFilled === 0
            ? total
            : lastFilled
          : parsedCurrents[index]!;
      const currentChapter = Math.min(currentBase, total);
      lastFilled = Math.max(lastFilled, currentChapter);

      return {
        id: `manual-${Date.now()}-${index}`,
        name: item.name.trim(),
        description: item.description.trim(),
        totalChapters: total,
        currentChapter,
        status: "Manual"
      };
    });

    setManhuas((current) => [...mappedManhuas, ...current]);
    setNote("Estante criada. Seus manhuas já estão na biblioteca.");
    setIsShelfOpen(false);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">MH</span>
          <span className="brand-name">Manhua Hub</span>
        </div>
        <nav className="nav">
          <Link to="/biblioteca">Biblioteca</Link>
          <Link to="/#descobrir">Descobrir</Link>
          <Link to="/#colecoes">Coleções</Link>
          <Link to="/#comunidade">Comunidade</Link>
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
        <Routes>
          <Route
            path="/"
            element={
              <Home
                stats={stats}
                note={note}
                recentManhuas={recentManhuas}
                onCreateShelf={handleCreateShelf}
                onImportList={handleImportList}
                onEditRecent={handleEditRecent}
                onExplore={handleExplore}
              />
            }
          />
          <Route
            path="/biblioteca"
            element={
              <Library
                manhuas={manhuas}
                onCreateShelf={handleCreateShelf}
                onEditBulk={handleEditAll}
                onEditSingle={handleEditSingle}
              />
            }
          />
          <Route
            path="*"
            element={
              <Home
                stats={stats}
                note={note}
                recentManhuas={recentManhuas}
                onCreateShelf={handleCreateShelf}
                onImportList={handleImportList}
                onEditRecent={handleEditRecent}
                onExplore={handleExplore}
              />
            }
          />
        </Routes>
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

      {isShelfOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <div>
                <p className="eyebrow">
                  {shelfMode === "edit" ? "Editar estante" : "Criar estante"}
                </p>
                <h2>
                  {shelfMode === "edit"
                    ? "Atualizar seus manhuas"
                    : "Adicionar manhuas manualmente"}
                </h2>
              </div>
              <button className="btn btn-ghost" onClick={handleCloseShelf}>
                Fechar
              </button>
            </div>

            {shelfMode === "create" && shelfStep === "count" ? (
              <div className="modal-body">
                <p className="modal-text">
                  Quantos manhuas você quer adicionar agora?
                </p>
                <input
                  className="input"
                  type="number"
                  min={1}
                  max={12}
                  value={shelfCount}
                  onChange={(event) =>
                    setShelfCount(Number(event.target.value))
                  }
                />
                <p className="field-hint">
                  Você pode adicionar mais depois.
                </p>
                <div className="modal-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleConfirmCount}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-body">
                <div className="shelf-form">
                  {shelfItems.map((item, index) => (
                    <div
                      className="shelf-card"
                      key={item.id ?? `shelf-${index}`}
                    >
                      <div className="shelf-card-header">
                        <span className={`series-cover tone-${(index % 4) + 1}`} />
                        <h3>Manhua {index + 1}</h3>
                      </div>
                      <label className="field">
                        <span>
                          Nome do manhua <strong className="required">*</strong>
                        </span>
                        <input
                          className={`input${
                            isMissingRequiredField(item, "name")
                              ? " input-required"
                              : ""
                          }`}
                          type="text"
                          value={item.name}
                          onChange={(event) =>
                            handleShelfChange(index, "name", event.target.value)
                          }
                        />
                      </label>
                      <label className="field">
                        <span>Descrição (opcional)</span>
                        <textarea
                          className="input textarea"
                          maxLength={220}
                          value={item.description}
                          onChange={(event) =>
                            handleShelfChange(
                              index,
                              "description",
                              event.target.value
                            )
                          }
                        />
                        <span className="field-hint">
                          Até 220 caracteres.
                        </span>
                      </label>
                      <div className="field-row">
                        <label className="field">
                          <span>
                            Capítulos totais{" "}
                            <strong className="required">*</strong>
                          </span>
                          <input
                            className={`input${
                              isMissingRequiredField(item, "totalChapters")
                                ? " input-required"
                                : ""
                            }`}
                            type="number"
                            min={1}
                            value={item.totalChapters}
                            onChange={(event) =>
                              handleShelfChange(
                                index,
                                "totalChapters",
                                event.target.value
                              )
                            }
                          />
                        </label>
                        <label className="field">
                          <span>Capítulo atual</span>
                          <input
                            className="input"
                            type="number"
                            min={0}
                            value={item.currentChapter}
                            onChange={(event) =>
                              handleShelfChange(
                                index,
                                "currentChapter",
                                event.target.value
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {shelfError ? (
                  <p className="action-note" aria-live="polite">
                    {shelfError}
                  </p>
                ) : null}
                <div className="modal-actions">
                  <button className="btn btn-ghost" onClick={handleCloseShelf}>
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveShelf}>
                    {shelfMode === "edit" ? "Salvar alterações" : "Salvar estante"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
