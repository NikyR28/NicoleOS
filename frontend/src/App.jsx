import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BookGrid from "./components/BookGrid";
import ModifyBook from "./components/ModifyBook";
import AddBook from "./components/AddBook";
import BookCard from "./components/BookCard";
import './styles/main.css';
import './App.css';
import './styles/variables.css';
import X_close from './assets/x_close_nicole_os.webp';
import { useEffect, useState } from "react";
// import { getBooksSupabase, addBookSupabase, updateBookSupabase, deleteBookSupabase } from "./supabaseClient";
import { booksMock } from "./BooksDataMock";

function App() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedBook, setSelectedBook] = useState(null);
  const [modifyForm, setModifyForm] = useState(false);
  const [formBook, setFormBook] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState(booksMock);
  // const [books, setBooks] = useState([]);    

  /*
  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooksSupabase();
      if (data) setBooks(data);
    };
    fetchBooks();
  }, []);
  */

  const addNewBook = async (newBook) => {
    const createdBook = { ...newBook, id: Date.now() };
    setBooks((prevBooks) => [createdBook, ...prevBooks]);

    /*
    const insertedBook = await addBookSupabase(newBook);
    if (insertedBook) {
      setBooks((prevBooks) => [insertedBook, ...prevBooks]);
    }
    */

    setFormBook(false);
  };

  const handleSaveModifiedBook = async (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );

    /*
    const result = await updateBookSupabase(updatedBook.id, updatedBook);
    if (result) {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === updatedBook.id ? result : b))
      );
    }
    */

    setModifyForm(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = async (bookId) => {
    const isConfirmed = window.confirm("Sei davvero sicuro di voler eliminare questo libro?");
    if (!isConfirmed) return;

    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== bookId));

    /*
    const success = await deleteBookSupabase(bookId);
    if (success) {
      setBooks((prevBooks) => prevBooks.filter((b) => b.id !== bookId));
    }
    */

    setSelectedBook(null);
  };

  const tabFiltered = books.filter((book) => {
    switch (activeTab) {
      case 'READ': return book.status === 'READ';
      case 'OWNED': return book.status === 'OWNED';
      case 'WISHLIST': return book.status === 'WISHLIST';
      case 'LIBRARY': return book.is_library == true;
      default: return true;
    }
  });

  const filteredBooks = tabFiltered.filter((book) => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase().trim();
    return (
      book.title?.toLowerCase().trim().includes(query) ||
      book.author?.toLowerCase().trim().includes(query) ||
      book.genre?.toLowerCase().trim().includes(query)
    );
  });
  const onBookClick = (book) => setSelectedBook(book);
  const addBookButton = () => setFormBook((prev) => !prev);
  const modify = () => setModifyForm(true);

  useEffect(() => {
    if (selectedBook || modifyForm || formBook) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    };
  }, [selectedBook, modifyForm, formBook]);
  
  return (
    <div className="App">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="content-area">
        <Header setSearchTerm={setSearchTerm} addBookButton={addBookButton} />
        <BookGrid books={filteredBooks} activeTab={activeTab} onBookClick={onBookClick} />
        {selectedBook && (
          <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedBook(null)} className="buttonCloseCard">
                <img src={X_close} alt="Chiudi" />
              </button>
              <BookCard
                title={selectedBook.title}
                author={selectedBook.author}
                pages={selectedBook.pages}
                genre={selectedBook.genre}
                coverUrl={selectedBook.cover_url}
                status={selectedBook.status}
                startDate={selectedBook.start_date}
                endDate={selectedBook.end_date}
                rating={selectedBook.rating}
                reviewText={selectedBook.review_text}
                format={selectedBook.format}
                binding={selectedBook.binding}
                isLibrary={selectedBook.is_library}
                returnDate={selectedBook.is_library ? selectedBook.return_date : null}
                modify={modify}
                onDelete={() => handleDeleteBook(selectedBook.id)}
              />
            </div>
          </div>
        )}
        {formBook && (
          <div className="modal-overlay" onClick={() => setFormBook(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <AddBook addNewBook={addNewBook} />
            </div>
          </div>
        )}
        {modifyForm && selectedBook && (
          <div className="modal-overlay" onClick={() => setModifyForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ModifyBook
                bookToEdit={selectedBook}
                onSave={handleSaveModifiedBook}
                onCancel={() => setModifyForm(false)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;