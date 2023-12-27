import { useState } from "react";
import BookSearch from "./components/BookSearch";
import BookDetailModal from "./components/BookDetailModal";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
    setLoading(false); // Set loading to false after search results are set
  };

  const handleBookDetail = (book) => {
    setSelectedBook(book); // Set selectedBook state with the chosen book
  };

  const handleCloseModal = () => {
    setSelectedBook(null); // Reset selectedBook state when modal is closed
  };

  return (
    <div className="App">
      <header>
        <h1>Kitap Arama Uygulaması</h1>
        <BookSearch onSearch={handleSearch} setLoading={setLoading} />
      </header>
      <div className="results">
        {loading && <div className="loading"></div>} {/* Render loading indicator if loading */}
        {searchResults.map((book) => (
          <div key={book.id} className="book">
            <img src={book.image} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <button onClick={() => handleBookDetail(book)}>Detay</button>
          </div>
        ))}
      </div>
      {/* Conditional rendering for the modal */}
      <div className={`modal ${selectedBook ? 'display-block' : 'display-none'}`}>
        {selectedBook && (
          <BookDetailModal book={selectedBook} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default App;
