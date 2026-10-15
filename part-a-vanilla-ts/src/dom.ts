import { Book } from './types';

export function createBookCardElement(book: Book, isFav: boolean): HTMLElement {
  const article = document.createElement('article');
  article.className = 'book-card';
  article.dataset.id = book.id;

  const infoDiv = document.createElement('div');

  const titleEl = document.createElement('h3');
  titleEl.className = 'book-title';
  titleEl.textContent = book.title;

  const authorEl = document.createElement('p');
  authorEl.className = 'book-meta';
  authorEl.textContent = `Tác giả: ${book.author}`;

  const yearEl = document.createElement('p');
  yearEl.className = 'book-meta';
  yearEl.textContent = `Năm XB: ${book.year} (Mã: #${book.id})`;

  const genreBadge = document.createElement('span');
  genreBadge.className = 'book-genre';
  genreBadge.textContent = book.genre;

  infoDiv.appendChild(titleEl);
  infoDiv.appendChild(authorEl);
  infoDiv.appendChild(yearEl);
  infoDiv.appendChild(genreBadge);

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'card-actions';

  const favBtn = document.createElement('button');
  favBtn.type = 'button';
  favBtn.className = isFav ? 'btn btn-outline btn-fav active' : 'btn btn-outline btn-fav';
  favBtn.dataset.action = 'favorite';
  favBtn.textContent = isFav ? '♥ Đã thích' : '♡ Yêu thích';

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.dataset.action = 'delete';
  deleteBtn.textContent = 'Xóa';

  actionsDiv.appendChild(favBtn);
  actionsDiv.appendChild(deleteBtn);

  article.appendChild(infoDiv);
  article.appendChild(actionsDiv);

  return article;
}

export function renderGenreOptions(selectEl: HTMLSelectElement, books: Book[]): void {
  const currentVal = selectEl.value || 'ALL';
  while (selectEl.firstChild) {
    selectEl.removeChild(selectEl.firstChild);
  }

  const allOpt = document.createElement('option');
  allOpt.value = 'ALL';
  allOpt.textContent = 'Tất cả thể loại';
  selectEl.appendChild(allOpt);

  const genreSet = new Set<string>(books.map((b) => b.genre));
  genreSet.forEach((genre) => {
    const opt = document.createElement('option');
    opt.value = genre;
    opt.textContent = genre;
    selectEl.appendChild(opt);
  });

  selectEl.value = genreSet.has(currentVal) ? currentVal : 'ALL';
}
