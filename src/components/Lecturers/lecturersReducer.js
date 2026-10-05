import { lecturersData } from '../../data/lecturersData';

/**
 * Вспомогательная функция для получения базовой цены лектора (за индивидуальное занятие)
 */
export const getLecturerBasePrice = (lecturer) => {
  if (!lecturer.tariffs || lecturer.tariffs.length === 0) return 0;
  const indivTariff =
    lecturer.tariffs.find((t) => t.name.toLowerCase().includes('индивидуальн')) ||
    lecturer.tariffs[0];
  const num = parseInt(indivTariff.price.replace(/[^\d]/g, ''), 10);
  return isNaN(num) ? 0 : num;
};

/**
 * Вспомогательная функция для получения числового стажа лектора (в годах)
 */
export const getLecturerExperience = (lecturer) => {
  if (!lecturer.experience) return 0;
  const match = lecturer.experience.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

/**
 * Применение всех активных фильтров и сортировки к списку лекторов
 */
export function applyFiltersAndSort(lecturers, state) {
  let result = [...lecturers];

  // 1. Фильтр по направлению (категории)
  if (state.selectedCategory && state.selectedCategory !== 'Все направления') {
    result = result.filter((l) => l.category === state.selectedCategory);
  }

  // 2. Фильтр по поисковой строке
  if (state.searchQuery && state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    result = result.filter((lecturer) => {
      const inName = lecturer.name.toLowerCase().includes(query);
      const inEducation = lecturer.education.toLowerCase().includes(query);
      const inDisciplines = lecturer.disciplines.some(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.topics.some((t) => t.toLowerCase().includes(query))
      );
      return inName || inEducation || inDisciplines;
    });
  }

  // 3. Действие: «по цене»
  if (state.priceFilter && state.priceFilter !== 'all') {
    switch (state.priceFilter) {
      case 'under_2500':
        result = result.filter((l) => getLecturerBasePrice(l) <= 2500);
        break;
      case '2500_3000':
        result = result.filter((l) => {
          const p = getLecturerBasePrice(l);
          return p >= 2500 && p <= 3000;
        });
        break;
      case 'over_3000':
        result = result.filter((l) => getLecturerBasePrice(l) > 3000);
        break;
      case 'asc':
        result.sort((a, b) => getLecturerBasePrice(a) - getLecturerBasePrice(b));
        break;
      case 'desc':
        result.sort((a, b) => getLecturerBasePrice(b) - getLecturerBasePrice(a));
        break;
      default:
        if (typeof state.priceFilter === 'number') {
          result = result.filter((l) => getLecturerBasePrice(l) <= state.priceFilter);
        }
        break;
    }
  }

  // 4. Действие: «по стажу»
  if (state.experienceFilter && state.experienceFilter !== 'all') {
    switch (state.experienceFilter) {
      case 'under_10':
        result = result.filter((l) => getLecturerExperience(l) < 10);
        break;
      case '10_to_15':
        result = result.filter((l) => {
          const exp = getLecturerExperience(l);
          return exp >= 10 && exp <= 15;
        });
        break;
      case 'over_15':
        result = result.filter((l) => getLecturerExperience(l) > 15);
        break;
      case 'asc':
        result.sort((a, b) => getLecturerExperience(a) - getLecturerExperience(b));
        break;
      case 'desc':
        result.sort((a, b) => getLecturerExperience(b) - getLecturerExperience(a));
        break;
      default:
        if (typeof state.experienceFilter === 'number') {
          result = result.filter((l) => getLecturerExperience(l) >= state.experienceFilter);
        }
        break;
    }
  }

  return result;
}

/**
 * Начальное состояние фильтров
 */
export const initialFilterState = {
  selectedCategory: 'Все направления',
  searchQuery: '',
  priceFilter: 'all',
  experienceFilter: 'all',
  items: lecturersData
};

export const initFilterState = (initialList = lecturersData) => ({
  selectedCategory: 'Все направления',
  searchQuery: '',
  priceFilter: 'all',
  experienceFilter: 'all',
  items: initialList
});

/**
 * Reducer для управления фильтрами лекторов (Вариант 3)
 * Поддерживает действия:
 * - «по цене» ('по цене', 'BY_PRICE', 'SET_PRICE_FILTER')
 * - «по стажу» ('по стажу', 'BY_EXPERIENCE', 'SET_EXPERIENCE_FILTER')
 * - «сбросить» ('сбросить', 'RESET', 'RESET_FILTERS')
 * - 'SET_CATEGORY' / 'по категории'
 * - 'SET_SEARCH' / 'поиск'
 */
export function lecturersFilterReducer(state, action) {
  let nextState = state;

  switch (action.type) {
    // Действие: «по цене»
    case 'по цене':
    case 'ПО_ЦЕНЕ':
    case 'BY_PRICE':
    case 'FILTER_BY_PRICE':
    case 'SET_PRICE_FILTER':
      nextState = { ...state, priceFilter: action.payload };
      break;

    // Действие: «по стажу»
    case 'по стажу':
    case 'ПО_СТАЖУ':
    case 'BY_EXPERIENCE':
    case 'FILTER_BY_EXPERIENCE':
    case 'SET_EXPERIENCE_FILTER':
      nextState = { ...state, experienceFilter: action.payload };
      break;

    // Категория / направление
    case 'по категории':
    case 'по направлению':
    case 'SET_CATEGORY':
      nextState = { ...state, selectedCategory: action.payload };
      break;

    // Поиск
    case 'поиск':
    case 'SET_SEARCH':
      nextState = { ...state, searchQuery: action.payload };
      break;

    // Действие: «сбросить» — возвращает исходный список
    case 'сбросить':
    case 'СБРОСИТЬ':
    case 'RESET':
    case 'RESET_FILTERS':
      return {
        ...initialFilterState,
        items: lecturersData
      };

    default:
      return state;
  }

  return {
    ...nextState,
    items: applyFiltersAndSort(lecturersData, nextState)
  };
}
