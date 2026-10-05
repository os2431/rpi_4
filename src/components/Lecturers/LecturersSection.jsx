import { useState, useMemo } from 'react';
import { lecturersData, CATEGORIES } from '../../data/lecturersData';
import LecturerCard from './LecturerCard';
import './Lecturers.css';

function LecturersSection({ onBook }) {
  const [selectedCategory, setSelectedCategory] = useState('Все направления');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLecturers = useMemo(() => {
    return lecturersData.filter((lecturer) => {
      // Фильтр по направлению
      if (selectedCategory !== 'Все направления' && lecturer.category !== selectedCategory) {
        return false;
      }

      // Фильтр по поисковому запросу (имя, образование, дисциплины, темы)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = lecturer.name.toLowerCase().includes(query);
        const inEducation = lecturer.education.toLowerCase().includes(query);
        const inDisciplines = lecturer.disciplines.some(
          (d) =>
            d.title.toLowerCase().includes(query) ||
            d.topics.some((t) => t.toLowerCase().includes(query))
        );

        if (!inName && !inEducation && !inDisciplines) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="lecturers" className="lecturersSection">
      <div className="lecturersHeader">
        <h2 className="lecturersTitle">Наши лекторы и программы</h2>
        <p className="lecturersSubtitle">
          Выберите преподавателя и дисциплину для индивидуальных или корпоративных занятий
        </p>
      </div>

      {/* Панель фильтров и поиска */}
      <div className="filterContainer">
        <div className="searchRow">
          <div className="searchInputWrapper">
            <span className="searchIcon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="searchInput"
              placeholder="Поиск по лектору, дисциплине или теме занятия..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clearSearchBtn"
                onClick={() => setSearchQuery('')}
                title="Очистить поиск"
              >
                ✕
              </button>
            )}
          </div>

          <div className="resultsCountBadge">
            Доступно лекторов: <strong>{filteredLecturers.length}</strong>
          </div>
        </div>

        {/* Категории по предметам */}
        <div className="categoriesRow" role="radiogroup" aria-label="Категории направлений">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`categoryPill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Список лекторов */}
      {filteredLecturers.length > 0 ? (
        <div className="lecturersList">
          {filteredLecturers.map((lecturer) => (
            <LecturerCard
              key={lecturer.id}
              lecturer={lecturer}
              onBook={onBook}
            />
          ))}
        </div>
      ) : (
        <div className="noLecturersFound">
          <h3>Преподаватели не найдены</h3>
          <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
          <button
            type="button"
            className="bookLecturerBtn"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              setSelectedCategory('Все направления');
              setSearchQuery('');
            }}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  );
}

export default LecturersSection;
