import styles from './BookGrid.module.css'
import BookCard from './BookCard'

function BookGrid({ books, activeTab }) {
    if (!books) return (<div className={styles['no-books']}>Nessun Libro Trovato</div>);
    else {
        return (
            <div>
                <div className={styles['which-books']}>Libri:`${activeTab}`</div>
                {books.map((book) => {
                    return (
                        <BookCard
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            pages={book.pages}
                            genre={book.genre}
                            coverUrl={book.cover_url}
                            status={book.status}
                            startDate={book.start_date}
                            endDate={book.end_date}
                            rating={book.rating}
                            reviewText={book.review_text}
                            format={book.format}
                            binding={book.binding}
                            isLibrary={book.is_library}
                            returnDate={book.is_library ? book.return_date : null}
                        >
                        </BookCard>
                    );
                })}
            </div>
        );
    }
}
export default BookGrid;