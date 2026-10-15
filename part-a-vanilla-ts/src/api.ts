import { Book, NewBookPayload } from './types';


const MOCK_API_URL = '[https://67f000000000000000000000.mockapi.io/books](https://67f000000000000000000000.mockapi.io/books)';
const USE_MOCK_API = false;

export async function fetchBooks(): Promise<Book[]> {
  const url = USE_MOCK_API ? MOCK_API_URL : '/books.json';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Lỗi tải dữ liệu (HTTP ${response.status})`);
  }
  return (await response.json()) as Book[];
}

export async function addBookApi(payload: NewBookPayload): Promise<Book> {
  if (!USE_MOCK_API) {
    return { ...payload, id: String(Date.now()) };
  }
  const response = await fetch(MOCK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Không thể thêm sách lên server.');
  }
  return (await response.json()) as Book;
}

export async function deleteBookApi(id: string): Promise<void> {
  if (!USE_MOCK_API) return;
  const response = await fetch(`${MOCK_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Không thể xóa sách trên server.');
  }
}
