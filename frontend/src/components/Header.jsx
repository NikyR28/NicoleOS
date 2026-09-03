import styles from './Header.module.css'
import AddBook from '../assets/AddBook.png'
function Header(){
    const handleInputChange = (e) =>{

    };
    return(
        <header className={styles.header}>
            <div className={styles.searchbar}>
                <label htmlFor="search"><img src="https://www.freeiconspng.com/uploads/search-icon-png-9.png" alt="🔎" className={styles['search-img']}/></label>
                <input type="search" name='search' onChange={handleInputChange} placeholder='Cerca nella mia libreria'/>
                <button className={styles['button-add']}><img src={AddBook} alt="AGGIUNGI" /></button>
            </div>
        </header>
    );
}
export default Header;