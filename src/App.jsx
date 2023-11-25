import React, { useState, useEffect } from "react";
import Books from "./components/book/Books";

export const App = () => {
  const getDataStorage = () => {
    const data = localStorage.getItem("books");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  };

  // main array of objects state || books state || books array of objects
  const [books, setBooks] = useState(getDataStorage());
  // input field states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [pubYear, setPubYear] = useState("");
  // input clear
  const clearInputs = () => {
    setAuthor("");
    setTitle("");
    setIsbn("");
    setPubYear("");
  };
  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    // creating a book object
    const book = {
      title,
      author,
      isbn,
      pubYear,
    };
    setBooks([...books, book]);
    clearInputs();
  };
  // delete book from LS
  const handleDelete = (isbn) => {
    const filterBooks = books.filter((element, index) => {
      return element.isbn !== isbn;
    });
    console.log(filterBooks);
    setBooks(filterBooks);
  };

  useEffect(() => {
    // saving data to local storage
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <div className="wrapper">
      <h1>BookList App</h1>
      <p>Add and view your books using local storage</p>
      <div className="main">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-group">
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              required></input>
            <br></br>
            <label>Author</label>
            <input
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              className="form-control"
              required></input>
            <br></br>
            <label>ISBN#</label>
            <input
              type="text"
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
              className="form-control"
              required></input>
            <br></br>
            <label>Published year</label>
            <input
              type="text"
              onChange={(e) => {
                setPubYear(e.target.value);
              }}
              value={pubYear}
              className="form-control"
              required></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              ADD
            </button>
          </form>
        </div>
        {books.length > 0 && (
          <div className="view-container">
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ISBN#</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Published</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {books?.map((book) => (
                      <Books
                        book={book}
                        key={book.isbn}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setBooks([])}
                className="btn btn-danger btn-md">
                Remove All
              </button>
            </>
          </div>
        )}
        {books.length < 1 && (
          <div className="noBooks">
            <p>No books are added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
