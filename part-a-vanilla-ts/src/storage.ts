const FAV_KEY = 'library_favorite_ids';
const THEME_KEY = 'library_theme';

export function getFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveFavoriteIds(ids: string[]): void {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export function getSavedTheme(): 'light' | 'dark' {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme);
}
