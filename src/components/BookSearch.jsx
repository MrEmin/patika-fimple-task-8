import { useState } from 'react';

function BookSearch({ onSearch, setLoading }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Function used to update the user's search term
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function triggered when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Open the loading state when the search begins

    try {
      // Request to the Google Books API
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&maxResults=40`
      );

      // Parsing the data received from the API as JSON
      const data = await response.json();

      // Extracting and formatting book information from the received data
      const books = data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
        image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        pageCount: item.volumeInfo.pageCount || 'N/A',
        publishedDate: item.volumeInfo.publishedDate || 'N/A',
      }));

      // Sending the book list to the onSearch function in the main app
      onSearch(books);
    } catch (error) {
      console.error('Error fetching data:', error); // Log error message if data fetching fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input where the user can enter the search term */}
      <input
        type="text"
        placeholder="Kitap veya yazar adı girin"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Ara</button>
    </form>
  );
}

export default BookSearch;
