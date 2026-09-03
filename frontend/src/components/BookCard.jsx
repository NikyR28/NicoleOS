import styles from './BookCard.module.css';

function BookCard({ 
  title, 
  author, 
  pages, 
  genre, 
  coverUrl, 
  status, 
  startDate, 
  endDate, 
  rating, 
  reviewText, 
  format, 
  binding, 
  isLibrary, 
  returnDate 
}) {
  const isPhysical = format === 'PAPERBACK' || format === 'HARDCOVER';

  return (
    <div className={styles.bookCard}>
      <img 
        src={coverUrl || '/placeholder-cover.jpg'} 
        alt={`Copertina di ${title}`} 
        className={styles.coverImage}
      />

      <section className={styles.important}>
        <h2>{title}</h2>
        <h3>{`di ${author}`}</h3>
      </section>

      <section className={styles.info}>
        {pages && <p>{`Numero di Pagine: ${pages}`}</p>}
        {genre && <p>{`Genere: ${genre}`}</p>}
        {status && <p>{`Status: ${status}`}</p>}
        {status !== 'WISHLIST' && (startDate || endDate) && (
          <p>{`Lettura: ${startDate || '...'} al ${endDate || 'In corso'}`}</p>
        )}
      </section>

      {status !== 'WISHLIST' && (rating || reviewText) && (
        <section className={styles.review}>
          {rating && <p>{`${rating} ⭐`}</p>}
          {reviewText && (
            <div>
              <p><strong>Recensione:</strong></p>
              <p>{reviewText}</p>
            </div>
          )}
        </section>
      )}
      
      <section className={styles.additionalInfo}>
        {format && <p>{`Formato: ${format}`}</p>}
        {isPhysical && binding && <p>{`Rilegatura: ${binding}`}</p>}
        {isLibrary && (
          <p>{`Libro della Biblioteca ${returnDate ? `| Scadenza: ${returnDate}` : ''}`}</p>
        )}
      </section>
    </div>
  );
}

export default BookCard;