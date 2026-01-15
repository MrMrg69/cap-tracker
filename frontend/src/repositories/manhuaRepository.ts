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

const sanitize = (items: unknown[]): ManhuaItem[] =>
  items.filter((item): item is ManhuaItem => Boolean(item && typeof item === "object"));

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
