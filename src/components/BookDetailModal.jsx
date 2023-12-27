import { useEffect, useState } from "react";

function BookDetailModal({ book, onClose }) {
  const [detailedBookInfo, setDetailedBookInfo] = useState(null);

  // Fetches detailed book information using the Google Books API
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${book.id}?key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        setDetailedBookInfo(data.volumeInfo);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (book) {
      fetchBookDetails();
    }
  }, [book]);

  // Function to clean HTML tags from text
  const cleanHTMLTags = (textWithHTML) => {
    const div = document.createElement("div");
    div.innerHTML = textWithHTML;
    return div.textContent || div.innerText || "";
  };

  // If detailed book information is not available, returns null
  if (!detailedBookInfo) {
    return null;
  }

  // Render modal with detailed book information
  return (
    <div className="modal display-block">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{detailedBookInfo.title}</h2>
        <p>
          <span className="bold-text">Yazar:</span>{" "}
          {detailedBookInfo.authors
            ? detailedBookInfo.authors.join(", ")
            : "Unknown Author"}
        </p>
        <p>
          <span className="bold-text">Sayfa Sayısı:</span>{" "}
          {detailedBookInfo.pageCount || "N/A"}
        </p>
        <p>
          <span className="bold-text">Yayın Tarihi:</span>{" "}
          {detailedBookInfo.publishedDate || "N/A"}
        </p>
        <p>
          <span className="bold-text">Açıklama:</span>{" "}
          {detailedBookInfo.description
            ? cleanHTMLTags(detailedBookInfo.description)
            : "Açıklama bulunamadı"}
        </p>
        <p>
          <span className="bold-text">Yayınevi:</span>{" "}
          {detailedBookInfo.publisher || "Yayınevi bilgisi bulunamadı"}
        </p>
      </div>
    </div>
  );
}

export default BookDetailModal;
