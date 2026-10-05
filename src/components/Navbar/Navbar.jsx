import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ currentPage, onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = ['hero', 'partners', 'about'];
      const scrollY = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleLinkClick = (page, sectionId) => {
    if (page === 'home' && sectionId) {
      setActiveSection(sectionId);
    }
    onNavigate(page, sectionId);
  };

  return (
    <header className="navbarWrapper">
      <nav className="navbar navbar__bar" aria-label="Основная навигация">
        <ul className="navLinks">
          <li>
            <button
              type="button"
              className={`navLink ${currentPage === 'home' && activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => handleLinkClick('home', 'hero')}
            >
              Главная
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navLink ${currentPage === 'home' && activeSection === 'partners' ? 'active' : ''}`}
              onClick={() => handleLinkClick('home', 'partners')}
            >
              Партнеры
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navLink ${currentPage === 'home' && activeSection === 'about' ? 'active' : ''}`}
              onClick={() => handleLinkClick('home', 'about')}
            >
              О нас
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navLink ${currentPage === 'lecturers' ? 'active' : ''}`}
              onClick={() => handleLinkClick('lecturers')}
            >
              Лекторы
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
