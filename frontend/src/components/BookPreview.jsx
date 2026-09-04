import styles from './BookPreview.module.css';
function BookPreview({ title, author, coverUrl, onBookClick, book }) {
  return (
    <div className={styles.BookPreview} onClick={() => onBookClick(book)}>
      <img
        src={coverUrl || '/placeholder-cover.jpg'}
        alt={`${title}`}
        className={styles.coverImage}
      />
    </div>
  );
}

export default BookPreview;