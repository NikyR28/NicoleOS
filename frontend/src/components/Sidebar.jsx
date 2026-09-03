import styles from './Sidebar.module.css';
import logo from '../assets/Logo.png';
import AllBook from '../assets/AllBook.png'
import ReadBook from '../assets/ReadBook.png'
import NotReadBook from '../assets/NotReadBook.png'
import WishListBook from '../assets/WishListBook.png'
import LogoWrittenNicoleOS from '../assets/LogoWriteNicoleOS.png'
function Sidebar({ activeTab, setActiveTab }) {
    return (
        <aside className={styles.aside}>
            <div className={styles.logo}>
                <img src={logo} alt="📖" className={styles['logo-img']} />
                <img src={LogoWrittenNicoleOS} alt="Nicole's OS" className={styles['logo-written']}/>
            </div>
            <nav className={styles.navbar}>
                <button 
                    className={`${styles['button-navbar']} ${activeTab === 'ALL' ? styles.active : ''}`}
                    onClick={() => setActiveTab('ALL')}
                >
                    <img src={AllBook} alt="📚" />
                    <span>Tutti i Libri</span>
                </button>
                <button 
                    className={`${styles['button-navbar']} ${activeTab === 'READ' ? styles.active : ''}`}
                    onClick={() => setActiveTab('READ')}
                >
                    <img src={ReadBook} alt="✅" />
                    <span>Libri Letti</span>
                </button>
                <button
                    className={`${styles['button-navbar']} ${activeTab === 'UNREAD' ? styles.active : ''}`}
                    onClick={() => setActiveTab('UNREAD')}
                >
                    <img src={NotReadBook} alt="❌" />
                    <span>Libri Non Letti</span>
                </button>
                <button
                    className={`${styles['button-navbar']} ${activeTab === 'WISHLIST' ? styles.active : ''}`}
                    onClick={() => setActiveTab('WISHLIST')}
                >
                    <img src={WishListBook} alt="✨" />
                    <span>Lista Desideri</span>
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar;