import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from '../components/ui/Dropdown';
import { SearchModal } from 'layouts/Search';

export const Navbar = ({ user }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navbarRef = useRef();
    const searchModalRef = useRef();

    const handleResize = () => {
        if (window.innerWidth >= 837) setIsExpanded(true);
    };

    const handleOutsideClick = ({ target: element }) => {
        if (window.innerWidth >= 837) return;

        if (navbarRef.current.contains(element)) {
            return;
        }

        setIsExpanded(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header className='navbar' ref={navbarRef}>
                <h1 className='navbar__logo'>City Pulse</h1>
                <button
                    className='navbar__trigger'
                    aria-expanded={isExpanded}
                    onClick={() => {
                        setIsExpanded((prevState) => !prevState);
                    }}
                    aria-controls='navbar-menu'
                >
                    {isExpanded ? (
                        <i className='fa-solid fa-xmark fa-xl'></i>
                    ) : (
                        <i className='fa-solid fa-bars fa-xl'></i>
                    )}

                    <span className='sr-only'>
                        {isExpanded ? 'Close menu' : 'Open menu'}
                    </span>
                </button>

                <nav
                    className={
                        isExpanded
                            ? 'navbar__container navbar__container--expanded'
                            : 'navbar__container'
                    }
                    id='navbar-menu'
                >
                    <div className='navbar__menu' role='menu'>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'navbar__link navbar__link--active'
                                    : 'navbar__link'
                            }
                            role='menuitem'
                            to='/'
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'navbar__link navbar__link--active'
                                    : 'navbar__link'
                            }
                            role='menuitem'
                            to='/about/'
                        >
                            About
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'navbar__link navbar__link--active'
                                    : 'navbar__link'
                            }
                            role='menuitem'
                            to='/contact/'
                        >
                            Contact
                        </NavLink>

                        {user ? (
                            <Dropdown title='Create'>
                                <NavLink
                                    to='/post/create'
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'navbar__link navbar__link--active'
                                            : 'navbar__link'
                                    }
                                >
                                    New post
                                </NavLink>
                                <NavLink
                                    to='/event/create'
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'navbar__link navbar__link--active'
                                            : 'navbar__link'
                                    }
                                >
                                    New event
                                </NavLink>
                            </Dropdown>
                        ) : (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'navbar__link navbar__link--active'
                                        : 'navbar__link'
                                }
                                role='menuitem'
                                to='/sign-up/'
                            >
                                Sign Up
                            </NavLink>
                        )}
                    </div>
                    {user && (
                        <div className='navbar__actions'>
                            <button
                                className='navbar__btn'
                                onClick={() =>
                                    searchModalRef.current.showModal()
                                }
                            >
                                <i className='fa-solid fa-magnifying-glass fa-xm'></i>
                                <span className='sr-only'>Search</span>
                            </button>
                            <button className='navbar__btn'>
                                <i className='fa-regular fa-bell fa-xm'></i>
                                <span className='sr-only'>Notifications</span>
                            </button>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'navbar__link navbar__link--active'
                                        : 'navbar__link'
                                }
                                to={`/user/${user._id}/`}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'navbar__link navbar__link--active'
                                        : 'navbar__link'
                                }
                                to='/settings/'
                            >
                                Settings
                            </NavLink>
                        </div>
                    )}
                </nav>
            </header>
            <SearchModal ref={searchModalRef} />
        </>
    );
};
