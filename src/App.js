import "./App.css";
import { useState } from "react";
import ShelvesList from "./components/ShelvesList";
import { getAll, update } from "./BooksAPI";
import { useEffect } from "react";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const moveBook = async (book, shelf) => {
    await update(book, shelf);
    getBooks();
  };

  async function getBooks(params) {
    const storage = await getAll();
    console.log(storage);
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
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
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
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
