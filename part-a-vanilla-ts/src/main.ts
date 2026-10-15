import { Book } from './types';
import { fetchBooks, addBookApi, deleteBookApi } from './api';
import { getFavoriteIds, saveFavoriteIds, getSavedTheme, saveTheme } from './storage';
import { createBookCardElement, renderGenreOptions } from './dom';
import { validateField, validateAllFields, FormFields } from './validator';

let books: Book[] = [];
let favoriteIds: string[] = getFavoriteIds();

const bookGrid = document.getElementById('book-grid') as HTMLElement;
const statusBar = document.getElementById('status-bar') as HTMLElement;
const favCountEl = document.getElementById('fav-count') as HTMLElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const genreFilter = document.getElementById('genre-filter') as HTMLSelectElement;
const themeToggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement;
const form = document.getElementById('add-book-form') as HTMLFormElement;

const formFields: FormFields = {
  titleInput: document.getElementById('title') as HTMLInputElement,
  authorInput: document.getElementById('author') as HTMLInputElement,
  genreInput: document.getElementById('genre') as HTMLSelectElement,
  yearInput: document.getElementById('year') as HTMLInputElement,
};

function updateFavoriteCount(): void {
  favCountEl.textContent = String(favoriteIds.length);
  saveFavoriteIds(favoriteIds);
}

function filterAndRenderBooks(): void {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreFilter.value;

  const filtered = books.filter((book) => {
    const matchName = book.title.toLowerCase().includes(keyword);
    const matchGenre = selectedGenre === 'ALL' || book.genre === selectedGenre;
    return matchName && matchGenre;
  });

  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }

  filtered.forEach((book) => {
    const isFav = favoriteIds.includes(book.id);
    const card = createBookCardElement(book, isFav);
    bookGrid.appendChild(card);
  });

  statusBar.classList.remove('error');
  statusBar.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
}

async function initApp(): Promise<void> {
  applyTheme(getSavedTheme());
  updateFavoriteCount();
  statusBar.textContent = 'Đang tải...';

  try {
    books = await fetchBooks();
    renderGenreOptions(genreFilter, books);
    filterAndRenderBooks();
  } catch (error) {
    statusBar.classList.add('error');
    statusBar.textContent =
      error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải danh sách sách.';
  }
}

searchInput.addEventListener('input', filterAndRenderBooks);
genreFilter.addEventListener('change', filterAndRenderBooks);

bookGrid.addEventListener('click', async (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const button = target.closest('button');
  if (!button) return;

  const card = button.closest('.book-card') as HTMLElement | null;
  const bookId = card?.dataset.id;
  if (!bookId) return;

  const action = button.dataset.action;

  if (action === 'favorite') {
    if (favoriteIds.includes(bookId)) {
      favoriteIds = favoriteIds.filter((id) => id !== bookId);
    } else {
      favoriteIds.push(bookId);
    }
    updateFavoriteCount();
    filterAndRenderBooks();
  } else if (action === 'delete') {
    const bookToDelete = books.find((b) => b.id === bookId);
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa cuốn "${bookToDelete?.title ?? ''}" không?`
    );
    if (!confirmed) return;

    try {
      await deleteBookApi(bookId);
      books = books.filter((b) => b.id !== bookId);
      favoriteIds = favoriteIds.filter((id) => id !== bookId);
      updateFavoriteCount();
      renderGenreOptions(genreFilter, books);
      filterAndRenderBooks();
    } catch {
      alert('Xóa sách thất bại. Vui lòng thử lại!');
    }
  }
});

Object.values(formFields).forEach((inputEl) => {
  inputEl.addEventListener('input', () => validateField(inputEl));
  inputEl.addEventListener('change', () => validateField(inputEl));
});

form.addEventListener('submit', async (event: SubmitEvent) => {
  event.preventDefault();
  if (!validateAllFields(formFields)) return;

  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
  submitBtn.disabled = true;

  try {
    const createdBook = await addBookApi({
      title: formFields.titleInput.value.trim(),
      author: formFields.authorInput.value.trim(),
      genre: formFields.genreInput.value,
      year: Number(formFields.yearInput.value.trim()),
    });

    books.unshift(createdBook);
    renderGenreOptions(genreFilter, books);
    filterAndRenderBooks();
    form.reset();
  } catch {
    alert('Không thể thêm sách mới. Vui lòng kiểm tra kết nối API!');
  } finally {
    submitBtn.disabled = false;
  }
});

function applyTheme(theme: 'light' | 'dark'): void {
  document.body.classList.toggle('dark', theme === 'dark');
  themeToggleBtn.textContent = theme === 'dark' ? '☀️ Sáng' : '🌙 Tối';
  saveTheme(theme);
}

themeToggleBtn.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
});

initApp();
