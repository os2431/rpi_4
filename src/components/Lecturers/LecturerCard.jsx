import { useState } from 'react';

function LecturerCard({ lecturer, onBook }) {
  const [activeDiscIdx, setActiveDiscIdx] = useState(0);
  const [showTopics, setShowTopics] = useState(true);

  const activeDiscipline = lecturer.disciplines[activeDiscIdx] || lecturer.disciplines[0];

  return (
    <article className="lecturerCard">
      { }
      <div className="lecturerTopRow">
        <div className="photoWrapper">
          <img
            src={lecturer.photo}
            onError={(e) => {
              if (lecturer.photoLocal && e.currentTarget.src !== lecturer.photoLocal) {
                e.currentTarget.src = lecturer.photoLocal;
              }
            }}
            alt={lecturer.name}
            className="lecturerPhoto"
            loading="lazy"
          />
        </div>

        <div className="lecturerProfileInfo">
          <div className="lecturerBadgeRow">
            <span className="lecturerCategoryTag">{lecturer.category}</span>
            {lecturer.degree && (
              <span className="lecturerDegreeTag">{lecturer.degree}</span>
            )}
          </div>

          <h3 className="lecturerName">{lecturer.name}</h3>

          <div className="lecturerBioMeta">
            <div className="metaItem">
              <strong>Образование:</strong> {lecturer.education}
            </div>
            <div className="metaItem">
              <strong>Преподавательский стаж:</strong> {lecturer.experience}
            </div>
            <div className="metaItem">
              <strong>Учёная степень:</strong> {lecturer.degree || 'Специалист-практик'}
            </div>
          </div>
        </div>
      </div>

      { }
      <div className="disciplinesBlock">
        <div className="disciplinesHeader">
          <h4 className="disciplinesBlockTitle">Преподаваемые дисциплины и программы:</h4>

          <div className="disciplineTabs" role="tablist">
            {lecturer.disciplines.map((disc, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeDiscIdx === idx}
                className={`disciplineTabBtn ${activeDiscIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveDiscIdx(idx)}
              >
                {disc.title}
              </button>
            ))}
          </div>
        </div>

        {activeDiscipline && (
          <div className="activeDisciplineContent">
            <h5 className="disciplineCourseTitle">{activeDiscipline.title}</h5>
            {activeDiscipline.description && (
              <p className="disciplineCourseDesc">— {activeDiscipline.description}</p>
            )}

            <button
              type="button"
              className="topicsToggleBtn"
              onClick={() => setShowTopics(!showTopics)}
            >
              <span>{showTopics ? '▲ Скрыть темы лекций' : '▼ Показать подробный план лекций (10 тем)'}</span>
            </button>

            {showTopics && (
              <ul className="topicsList">
                {activeDiscipline.topics.map((topic, tIdx) => (
                  <li key={tIdx} className="topicItem">
                    {topic}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Сетка тарифов */}
        <div className="tariffsSection">
          <h5 className="tariffsTitle">Стоимость и форматы занятий:</h5>
          <div className="tariffsGrid">
            {lecturer.tariffs.map((tariff, tIdx) => (
              <div key={tIdx} className="tariffCard">
                <span className="tariffName">{tariff.name}</span>
                <span className="tariffPrice">{tariff.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка бронирования */}
        <div className="lecturerBottomActions">
          <button
            type="button"
            className="bookLecturerBtn"
            onClick={() => onBook(lecturer, activeDiscipline)}
          >
            Записаться к лектору
          </button>
        </div>
      </div>
    </article>
  );
}

export default LecturerCard;
