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
  returnDate,
  modify,
  onDelete
}) {
  const isPhysical = format === 'PAPERBACK' || format === 'HARDCOVER';

  const getRemainingDaysInfo = (dateString) => {
    if (!dateString) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const returnDateObj = new Date(dateString);
    returnDateObj.setHours(0, 0, 0, 0);
    
    const diffTime = returnDateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `Scaduto da ${Math.abs(diffDays)} giorn${Math.abs(diffDays) === 1 ? 'o' : 'i'}`,
        statusClass: styles.badgeExpired,
      };
    } else if (diffDays === 0) {
      return {
        text: 'Scade Oggi!',
        statusClass: styles.badgeUrgent,
      };
    } else if (diffDays === 1) {
      return {
        text: 'Manca 1 giorno',
        statusClass: styles.badgeUrgent,
      };
    } else {
      return {
        text: `Mancano ${diffDays} giorni`,
        statusClass: diffDays <= 3 ? styles.badgeWarning : styles.badgeOk,
      };
    }
  };

  const daysInfo = isLibrary ? getRemainingDaysInfo(returnDate) : null;

  return (
    <div className={styles.bookCard}>
      <img
        src={coverUrl || '/placeholder-cover.jpg'}
        alt={`Copertina di: ${title}`}
        className={styles.coverImage}
      />
      <div className={styles.infoBook}>
        <section className={styles.important}>
          <h2>{title}</h2>
          <h3>{`di ${author}`}</h3>
        </section>
        <div>
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
          </section>
          {isLibrary && returnDate && (
            <div className={styles.librarySection}>
              {daysInfo && (
                <div className={`${styles.badge} ${daysInfo.statusClass}`}>
                  {daysInfo.text}
                </div>
              )}
              <div className={styles.dateLabel}>
                <strong>Restituzione:</strong> {new Date(returnDate).toLocaleDateString('it-IT')}
              </div>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={modify}>Modifica</button>
          <button onClick={onDelete}>Elimina</button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;