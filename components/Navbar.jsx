
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <img className={styles.img} src="/assets/images/gogo.png" alt="Gogo" />
                    <Link href='/'>
                        GoGo Travel
                    </Link>
                </div>

                <ul className={styles.links}>
                    <Link href='/find-flights'>
                        <li>Find flights ☎️</li>
                    </Link>
                    <Link href='/find-stays'>
                        <li>Find stays ☎️</li>
                    </Link>
                    <Link href='/'>
                        <li>Home 🏠</li>
                    </Link>
                    <Link href='/favourites'>
                        <li>Favourites 🐶</li>
                    </Link>

                    <Link href='/profile'>
                        <li>Profile 🐶</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
