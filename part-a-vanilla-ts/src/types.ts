export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
}

export type NewBookPayload = Omit<Book, 'id'>;
