import { useState } from "react";
import styles from './AddBook.module.css';

function AddBook({ addNewBook }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        pages: '',
        genre: '',
        status: 'WISHLIST',
        start_date: '',
        end_date: '',
        rating: '',
        review_text: '',
        format: 'PAPERBACK',
        binding: 'Copertina Rigida',
        return_date: '',
        cover_url: ''
    });

    const isRead = formData.status === 'READ';
    const isLibrary = formData.format === 'LIBRARY';

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: inputValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewBook(formData);
    };

    const handleReset = () => {
        setFormData({
            title: '', author: '', pages: '', genre: '', status: 'WISHLIST',
            start_date: '', end_date: '', rating: '', review_text: '',
            format: 'PAPERBACK', binding: 'Copertina Rigida', return_date: '', cover_url: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>
            <h2 className={styles.title}>Aggiungi Nuovo Libro</h2>

            {/* Informazioni Principali */}
            <div className={styles.gridContainer}>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="title">Titolo del Libro</label>
                    <input type="text" name="title" id="title" value={formData.title} required onChange={handleInputChange} placeholder="Es. Il Signore degli Anelli" />
                </div>

                <div className={styles.field}>
                    <label htmlFor="author">Autore</label>
                    <input type="text" name="author" id="author" value={formData.author} required onChange={handleInputChange} placeholder="Es. J.R.R. Tolkien" />
                </div>

                <div className={styles.field}>
                    <label htmlFor="genre">Genere</label>
                    <input type="text" name="genre" id="genre" value={formData.genre} required onChange={handleInputChange} placeholder="Es. Fantasy" />
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="cover_url">URL Copertina</label>
                    <input type="url" name="cover_url" id="cover_url" value={formData.cover_url} required onChange={handleInputChange} placeholder="https://..." />
                </div>

                <div className={styles.field}>
                    <label htmlFor="pages">Pagine</label>
                    <input type="number" name="pages" id="pages" value={formData.pages} required min="1" onChange={handleInputChange} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="status">Stato</label>
                    <select name="status" id="status" value={formData.status} required onChange={handleInputChange}>
                        <option value="WISHLIST">In Wishlist</option>
                        <option value="READ">Già Letto</option>
                        <option value="OWNED">Posseduto</option>
                    </select>
                </div>
            </div>
            {isRead && (
                <div className={styles.readSection}>
                    <div className={styles.gridContainer}>
                        <div className={styles.field}>
                            <label htmlFor="start_date">Data Inizio</label>
                            <input type="date" name="start_date" id="start_date" value={formData.start_date} onChange={handleInputChange} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="end_date">Data Fine</label>
                            <input type="date" name="end_date" id="end_date" value={formData.end_date} onChange={handleInputChange} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="format">Formato</label>
                            <select name="format" id="format" value={formData.format} onChange={handleInputChange}>
                                <option value="PAPERBACK">Cartaceo</option>
                                <option value="KINDLE">Kindle</option>
                                <option value="LIBRARY">Biblioteca</option>
                            </select>
                        </div>

                        {isLibrary && (
                            <div className={styles.field}>
                                <label htmlFor="return_date">Data Restituzione</label>
                                <input type="date" name="return_date" id="return_date" value={formData.return_date} onChange={handleInputChange} />
                            </div>
                        )}

                        <div className={styles.field}>
                            <label htmlFor="binding">Rilegatura</label>
                            <select name="binding" id="binding" value={formData.binding} onChange={handleInputChange}>
                                <option value="Copertina Rigida">Copertina Rigida</option>
                                <option value="Copertina Flessibile">Copertina Flessibile</option>
                                <option value="Digitale">Digitale</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="rating">Valutazione (0-5)</label>
                            <input type="number" name="rating" id="rating" value={formData.rating} step="0.5" min="0" max="5" onChange={handleInputChange} />
                        </div>

                        <div className={`${styles.field} ${styles.fullWidth}`}>
                            <label htmlFor="review_text">Recensione</label>
                            <textarea name="review_text" id="review_text" rows="3" value={formData.review_text} onChange={handleInputChange} placeholder="Cosa ne pensi di questo libro?"></textarea>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.buttonSection}>
                <button type="reset" className={styles.btnReset}>Reset</button>
                <button type="submit" className={styles.btnSubmit}>Invia</button>
            </div>
        </form>
    );
}

export default AddBook;