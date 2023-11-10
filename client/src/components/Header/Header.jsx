import styles from './Header.module.css'
import { useAuth } from '../../Contexts/AuthContext'

import { Link } from 'react-router-dom'

const Header = () => {
    const { authenticated } = useAuth()
    return (
        <header>
            <nav>
                <ul>
                    <li className={styles.left}><Link to="/">Home</Link></li>
                    {authenticated ? (
                        <>
                            <li className={styles.left}><Link to="/movies">Movies</Link></li>
                            <li className={styles.right}><Link to="/logout">Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li className={styles.right}><Link to="/login">Login</Link></li>
                            <li className={styles.right}><Link to="/register">Register</Link></li>
                        </>
                    )}



                </ul>
            </nav>
        </header>

    )
}

export default Header