function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Пошук..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
export default SearchBar;
