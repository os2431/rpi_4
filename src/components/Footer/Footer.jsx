import './Footer.css';

function Footer({ onNavigate }) {
  return (
    <footer className="footerWrapper">
      <div className="footerContainer">
        <div className="footerBrandColumn">
          <div className="footerLogo">
            <span style={{ color: '#38bdf8' }}>●</span>
            <span>Учебная платформа</span>
          </div>
          <p className="footerDesc">
            Оказание онлайн и оффлайн услуг физическим и юридическим лицам по преподаванию
            академических дисциплин, подготовке спикеров и организации лекций ведущих экспертов.
          </p>
        </div>

        <div>
          <h4 className="footerColTitle">Навигация</h4>
          <ul className="footerLinks">
            <li>
              <button type="button" className="footerLinkBtn" onClick={() => onNavigate('home', 'hero')}>
                Главная страница
              </button>
            </li>
            <li>
              <button type="button" className="footerLinkBtn" onClick={() => onNavigate('home', 'partners')}>
                Партнеры платформы
              </button>
            </li>
            <li>
              <button type="button" className="footerLinkBtn" onClick={() => onNavigate('home', 'about')}>
                О нашей платформе
              </button>
            </li>
            <li>
              <button type="button" className="footerLinkBtn" onClick={() => onNavigate('lecturers')}>
                Каталог лекторов (10 экспертов)
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footerColTitle">Контакты</h4>
          <ul className="footerContactsList">
            <li>
              <strong>Телефон:</strong> +7 (800) 555-35-35
            </li>
            <li>
              <strong>Email:</strong> info@edu-platform.ru
            </li>
            <li>
              <strong>Режим работы:</strong> Пн–Пт, 09:00 – 20:00 (МСК)
            </li>
            <li>
              <strong>Локации:</strong> Москва, Казань, Санкт-Петербург, Онлайн
            </li>
          </ul>
        </div>
      </div>

      <div className="footerBottom">
        <span>&copy; {new Date().getFullYear()} Учебная платформа. Все права защищены.</span>
        <span>Учебный проект по React без сторонних библиотек.</span>
      </div>
    </footer>
  );
}

export default Footer;
