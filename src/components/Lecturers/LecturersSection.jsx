import { useReducer } from 'react';
import { lecturersData, CATEGORIES } from '../../data/lecturersData';
import LecturerCard from './LecturerCard';
import {
  lecturersFilterReducer,
  initFilterState
} from './lecturersReducer';
import './Lecturers.css';

function LecturersSection({ onBook }) {
  // Вариант 3: управление фильтрами через useReducer
  const [state, dispatch] = useReducer(
    lecturersFilterReducer,
    lecturersData,
    initFilterState
  );

  const {
    selectedCategory,
    searchQuery,
    priceFilter,
    experienceFilter,
    items: filteredLecturers
  } = state;

  const isFilterActive =
    selectedCategory !== 'Все направления' ||
    searchQuery.trim() !== '' ||
    priceFilter !== 'all' ||
    experienceFilter !== 'all';

  return (
    <section id="lecturers" className="lecturersSection">
      <div className="lecturersHeader">
        <h2 className="lecturersTitle">Наши лекторы и программы</h2>
        <p className="lecturersSubtitle">
          Выберите преподавателя и дисциплину для индивидуальных или корпоративных занятий
        </p>
      </div>

      {/* Панель фильтров и поиска (на useReducer) */}
      <div className="filterContainer">
        <div className="searchRow">
          <div className="searchInputWrapper">
            <span className="searchIcon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="searchInput"
              placeholder="Поиск по лектору, дисциплине или теме занятия..."
              value={searchQuery}
              onChange={(e) => dispatch({ type: 'поиск', payload: e.target.value })}
            />
            {searchQuery && (
              <button
                type="button"
                className="clearSearchBtn"
                onClick={() => dispatch({ type: 'поиск', payload: '' })}
                title="Очистить поиск"
              >
                ✕
              </button>
            )}
          </div>

          <div className="resultsCountBadge">
            Доступно лекторов: <strong>{filteredLecturers.length}</strong> из {lecturersData.length}
          </div>
        </div>

        {/* Дополнительные фильтры Варианта 3: «по цене», «по стажу», «сбросить» */}
        <div className="reducerFiltersRow">
          <div className="filterControlGroup">
            <label htmlFor="price-filter" className="filterLabel">
              Фильтр по цене:
            </label>
            <select
              id="price-filter"
              className="filterSelect"
              value={priceFilter}
              onChange={(e) => dispatch({ type: 'по цене', payload: e.target.value })}
            >
              <option value="all">Все цены</option>
              <option value="under_2500">До 2 500 ₽</option>
              <option value="2500_3000">2 500 – 3 000 ₽</option>
              <option value="over_3000">От 3 000 ₽</option>
              <option value="asc">Сначала недорогие</option>
              <option value="desc">Сначала дорогие</option>
            </select>
          </div>

          <div className="filterControlGroup">
            <label htmlFor="exp-filter" className="filterLabel">
              Фильтр по стажу:
            </label>
            <select
              id="exp-filter"
              className="filterSelect"
              value={experienceFilter}
              onChange={(e) => dispatch({ type: 'по стажу', payload: e.target.value })}
            >
              <option value="all">Любой стаж</option>
              <option value="under_10">До 10 лет</option>
              <option value="10_to_15">От 10 до 15 лет</option>
              <option value="over_15">Более 15 лет</option>
              <option value="desc">Сначала опытные</option>
              <option value="asc">Сначала молодые</option>
            </select>
          </div>

          {/* Кнопка «Сбросить»: действие reducer возвращает исходный список */}
          <button
            type="button"
            className={`resetFiltersBtn ${isFilterActive ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'сбросить' })}
            title="Сбросить все фильтры к исходному списку"
          >
            Сбросить
          </button>
        </div>

        {/* Категории по направлениям */}
        <div className="categoriesRow" role="radiogroup" aria-label="Категории направлений">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`categoryPill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'по категории', payload: cat })}
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
            onClick={() => dispatch({ type: 'сбросить' })}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  );
}

export default LecturersSection;
