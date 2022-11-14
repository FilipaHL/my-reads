import Shelf from "./Shelf";

const ShelvesList = ({ allBooks, moveBook }) => {
  const currentlyReading = allBooks.filter(
    (books) => books.shelf === "currentlyReading"
  );
  const wantToRead = allBooks.filter((books) => books.shelf === "wantToRead");
  const read = allBooks.filter((books) => books.shelf === "read");

  return (
    <div>
      <Shelf
        title="Currently Reading"
        books={currentlyReading}
        moveBook={moveBook}
      />
      <Shelf title="Read" books={read} moveBook={moveBook} />
      <Shelf title="Want to Read" books={wantToRead} moveBook={moveBook} />
    </div>
  );
};
export default ShelvesList;
