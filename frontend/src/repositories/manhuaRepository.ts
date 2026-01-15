import type { ManhuaItem } from "../types/manhua";

const STORAGE_KEY = "manhuaHub.manhuas.v1";

const isBrowser = () => typeof window !== "undefined";

const safeParse = (raw: string | null) => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const normalizeItem = (item: unknown): ManhuaItem | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const data = item as Partial<ManhuaItem>;
  if (!data.id || !data.name || !data.status) {
    return null;
  }

  const total = Number(data.totalChapters);
  const current = Number(data.currentChapter);
  if (!Number.isFinite(total) || !Number.isFinite(current)) {
    return null;
  }

  return {
    id: String(data.id),
    name: String(data.name),
    description: String(data.description ?? ""),
    totalChapters: total,
    currentChapter: current,
    status: String(data.status),
    favorite: Boolean(data.favorite)
  };
};

const sanitize = (items: unknown[]): ManhuaItem[] =>
  items
    .map(normalizeItem)
    .filter((item): item is ManhuaItem => item !== null);

const load = (fallback: ManhuaItem[]) => {
  if (!isBrowser()) {
    return fallback;
  }

  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
  if (!parsed) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }

  const sanitized = sanitize(parsed);
  if (sanitized.length === 0) {
    return fallback;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  return sanitized;
};

const save = (items: ManhuaItem[]) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const manhuaRepository = {
  load,
  save
};
