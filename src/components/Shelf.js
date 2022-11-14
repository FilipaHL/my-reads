import Books from "./Books";

const Shelf = ({ title, books, moveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book) => {
              return (
                <li key={book.id}>
                  <Books book={book} moveBook={moveBook} />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
};
export default Shelf;
