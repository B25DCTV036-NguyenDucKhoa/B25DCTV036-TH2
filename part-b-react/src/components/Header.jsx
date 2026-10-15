export default function Header({ libraryName, favoriteCount }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <h1>📚 {libraryName}</h1>
        <span className="fav-badge">
          ❤️ Yêu thích: <strong>{favoriteCount}</strong>
        </span>
      </div>
    </header>
  );
}
