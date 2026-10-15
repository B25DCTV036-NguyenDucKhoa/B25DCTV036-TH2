export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-meta">Tác giả: {book.author}</p>
        <p className="book-meta">Năm XB: {book.year}</p>
        <span className="book-genre">{book.genre}</span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className={isFavorite ? 'btn btn-fav active' : 'btn btn-outline'}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? '♥ Đã thích' : '♡ Yêu thích'}
        </button>
      </div>
    </article>
  );
}
