import styles from './BookGrid.module.css'
import BookPreview from './BookPreview'
import volpe from '../assets/img-volpe-no-book.png'
function BookGrid({ books, activeTab, onBookClick, }) {
    if (!books || books.length <= 0) { 
        return (
            <div className={`${styles['no-books']}`}>
                <span>Nessun Libro Trovato</span>
                <img src={volpe} alt="🦊❤️" />
            </div>); 
        }
    else {
        return (
            <div className={styles.bookGrid}>
                {books.map((book) => {
                    return (
                        <BookPreview
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            coverUrl={book.cover_url}
                            onBookClick={onBookClick}
                            book={book}
                        >
                        </BookPreview>
                    );
                })}
            </div>
        );
    }
}
export default BookGrid;