import headerStyles from './Header.module.css'
import { useAuth } from '../../Contexts/AuthContext'

import { Link } from 'react-router-dom'

const Header = () => {
    const { authenticated } = useAuth()
    return (
        <header>
            <nav>
                <ul>
                    <li className={headerStyles.left}><Link to="/">Home</Link></li>
                    <li className={headerStyles.left}><Link to="/movies">Movies</Link></li>
                    
                    {authenticated ? (
                        <>  
                            <li className={headerStyles.left}><Link to="/create-movie">Create Movie</Link></li>
                            <li className={headerStyles.right}><Link to="/logout">Logout</Link></li>
                            <li className={headerStyles.right}><Link to="/profile">Profile</Link></li>
                        </>
                    ) : (
                        <>
                            <li className={headerStyles.right}><Link to="/login">Login</Link></li>
                            <li className={headerStyles.right}><Link to="/register">Register</Link></li>
                        </>
                    )}



                </ul>
            </nav>
        </header>

    )
}

export default Header