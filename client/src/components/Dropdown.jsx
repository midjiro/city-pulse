import { useRef, useState, useEffect } from 'react';

export const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = ({ target: element }) => {
        if (dropdownRef.current.contains(element)) {
            return;
        }

        setIsOpen(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className='dropdown' ref={dropdownRef}>
            <button
                className='dropdown__toggle navbar__btn'
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                {title}
            </button>

            <div className='dropdown__menu'>{children}</div>
        </div>
    );
};
