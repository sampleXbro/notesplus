import {Title} from '../Title/Title'
import {NavLink} from "react-router-dom"
import styles from './Navbar.module.sass'

export const Navbar = () => (
    <nav className={styles.navbar}>
        <Title margin={'auto 10px'} size={'24px'} color={'white'}>NOTES+</Title>
        <ul className={styles.navmenu}>
            <li>
                <NavLink
                    className={styles.navlink}
                    activeClassName={styles.navlinkActive}
                    exact
                    to={'/'}>
                    NOTES
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={styles.navlink}
                    activeClassName={styles.navlinkActive}
                    to={'/categories'}>
                    CATEGORIES
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={styles.navlink}
                    activeClassName={styles.navlinkActive}
                    to={'/labels'}>
                    LABELS
                </NavLink>
            </li>
        </ul>
    </nav>
)

