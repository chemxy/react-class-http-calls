import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/events"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Admin
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
