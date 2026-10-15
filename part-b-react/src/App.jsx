import { useState } from 'react';
import { initialBooks } from './data/books';
import Header from './components/Header';
import Section from './components/Section';
import GenreFilter from './components/GenreFilter';
import BookList from './components/BookList';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  const genres = ['Tất cả', ...new Set(initialBooks.map((b) => b.genre))];

  const handleToggleFavorite = (bookId) => {
    setFavoriteIds((prevIds) =>
      prevIds.includes(bookId)
        ? prevIds.filter((id) => id !== bookId)
        : [...prevIds, bookId]
    );
  };

  const filteredBooks =
    selectedGenre === 'Tất cả'
      ? initialBooks
      : initialBooks.filter((book) => book.genre === selectedGenre);

  return (
    <div className="app-wrapper">
      <Header
        libraryName="Thư Viện Lớp Học"
        favoriteCount={favoriteIds.length}
      />

      <main className="container main-content">
        <Section title="Lọc theo thể loại">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </Section>

        <Section
          title={`Danh sách sách (${filteredBooks.length} / ${initialBooks.length} cuốn)`}
        >
          <BookList
            books={filteredBooks}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
