import { useState, useEffect } from "react";
import styles from './AddBook.module.css';

function ModifyBook({ bookToEdit, onSave, onCancel }) {
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
    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title || '',
                author: bookToEdit.author || '',
                pages: bookToEdit.pages || '',
                genre: bookToEdit.genre || '',
                status: bookToEdit.status || 'WISHLIST',
                start_date: bookToEdit.start_date || '',
                end_date: bookToEdit.end_date || '',
                rating: bookToEdit.rating || '',
                review_text: bookToEdit.review_text || '',
                format: bookToEdit.format || 'PAPERBACK',
                binding: bookToEdit.binding || 'Copertina Rigida',
                return_date: bookToEdit.return_date || '',
                cover_url: bookToEdit.cover_url || ''
            });
        }
    }, [bookToEdit]);

    const isRead = formData.status === 'READ';
    const isLibrary = formData.format === 'LIBRARY';

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: inputValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...bookToEdit, ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Modifica Libro</h2>

            <div className={styles.gridContainer}>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="title">Modifica Titolo del Libro</label>
                    <input type="text" name="title" id="title" value={formData.title} required onChange={handleInputChange} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="author">Modifica Autore</label>
                    <input type="text" name="author" id="author" value={formData.author} required onChange={handleInputChange} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="genre">Modifica Genere</label>
                    <input type="text" name="genre" id="genre" value={formData.genre} required onChange={handleInputChange} />
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="cover_url">Modifica URL Copertina</label>
                    <input type="url" name="cover_url" id="cover_url" value={formData.cover_url} required onChange={handleInputChange} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="pages">Modifica Pagine</label>
                    <input type="number" name="pages" id="pages" value={formData.pages} required min="1" onChange={handleInputChange} />
                </div>

                <div className={styles.field}>
                    <label htmlFor="status">Modifica Stato</label>
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
                            <label htmlFor="start_date">Modifica Data Inizio</label>
                            <input type="date" name="start_date" id="start_date" value={formData.start_date} onChange={handleInputChange} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="end_date">Modifica Data Fine</label>
                            <input type="date" name="end_date" id="end_date" value={formData.end_date} onChange={handleInputChange} />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="format">Modifica Formato</label>
                            <select name="format" id="format" value={formData.format} onChange={handleInputChange}>
                                <option value="PAPERBACK">Cartaceo</option>
                                <option value="KINDLE">Kindle</option>
                                <option value="LIBRARY">Biblioteca</option>
                            </select>
                        </div>

                        {isLibrary && (
                            <div className={styles.field}>
                                <label htmlFor="return_date">Modifica Data Restituzione</label>
                                <input type="date" name="return_date" id="return_date" value={formData.return_date} onChange={handleInputChange} />
                            </div>
                        )}

                        <div className={styles.field}>
                            <label htmlFor="binding">Modifica Rilegatura</label>
                            <select name="binding" id="binding" value={formData.binding} onChange={handleInputChange}>
                                <option value="Copertina Rigida">Copertina Rigida</option>
                                <option value="Copertina Flessibile">Copertina Flessibile</option>
                                <option value="Digitale">Digitale</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="rating">Modifica Valutazione (0-5)</label>
                            <input type="number" name="rating" id="rating" value={formData.rating} step="0.5" min="0" max="5" onChange={handleInputChange} />
                        </div>

                        <div className={`${styles.field} ${styles.fullWidth}`}>
                            <label htmlFor="review_text">Modifica Recensione</label>
                            <textarea name="review_text" id="review_text" rows="3" value={formData.review_text} onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.buttonSection}>
                <button type="button" onClick={onCancel} className={styles.btnReset}>Annulla</button>
                <button type="submit" className={styles.btnSubmit}>Salva Modifiche</button>
            </div>
        </form>
    );
}

export default ModifyBook;