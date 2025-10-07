function Pagination({ currentPage, totalTodos, limit, onNext, onPrev }) {
  const totalPages = Math.ceil(totalTodos / limit);

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
export default Pagination;
