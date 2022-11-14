import "./App.css";
import { useState } from "react";
import ShelvesList from "./components/ShelvesList";
import { getAll, update } from "./BooksAPI";
import { useEffect } from "react";
import { search } from "./BooksAPI";
import Books from "./components/Books";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const moveBook = async (book, shelf) => {
    await update(book, shelf);
    getBooks();
  };
  function checkBooks(searchBooks) {
    const mixedBooks = searchBooks.map((book) => {
      const found = allBooks.find((booksFound) => {
        return booksFound.id === book.id;
      });
      if (found) return found;
      return book;
    });
    return mixedBooks;
  }

  const searchBook = async (query) => {
    try {
      const booksFound = await search(query);
      if (query.lenght < 1 || !booksFound) {
        return setSearchBooks([]);
      }
      if (booksFound.error || !booksFound) {
        return setSearchBooks([]);
      }

      setSearchBooks(checkBooks(booksFound));
    } catch (error) {
      console.log(error);
    }
  };

  async function getBooks(params) {
    const storage = await getAll();
    setAllBooks(storage);
  }
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              href="#a"
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                onChange={(e) => searchBook(e.target.value)}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchBooks.length > 1
                ? searchBooks.map((book) => {
                    return (
                      <li key={book.id}>
                        <Books book={book} moveBook={moveBook} />
                      </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <ShelvesList allBooks={allBooks} moveBook={moveBook} />
          </div>
          <div className="open-search">
            <a href="#a" onClick={() => setShowSearchpage(!showSearchPage)}>
              Add a book
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
