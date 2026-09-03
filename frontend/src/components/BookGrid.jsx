import styles from './BookGrid.module.css'

function BookGrid({ books }) {
    if(books.length==0||!books) return( <div className={styles['no-books']}>Nessun Libro Trovato</div>);
    else{
        return (
                <div>
                    {books.map((book) => {
                    return (
                        <CardBook
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            pages={book.pages}
                            genre={book.genre}
                            coverUrl={book.cover_url}
                            status={book.status}
                            startDate={book.start_date}
                            startEnd={book.start_end}
                            rating={book.rating}
                            reviewText={book.review_text}
                            format={book.format}
                            binding={book.binding}
                            isLibrary={book.is_library}
                            returnDate={book.is_library ? book.return_date : null}
                        >
                        </CardBook>
                    );
                })}
            </div>
        );
    }
}
export default BookGrid;