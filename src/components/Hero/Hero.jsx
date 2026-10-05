import { useTypewriter } from '../../hooks/useTypewriter';
import heroImage from '../../assets/hero-classroom.jpg';
import './Hero.css';

const SPECIALIZATIONS = [
  'IT и веб-разработке,',
  'Data Science & AI,',
  'UI/UX дизайне,',
  'алгоритмах и CS,',
  'экономике и финансах,',
  'прикладных науках,',
];

function Hero({ onFindLecturer }) {
  const { currentText } = useTypewriter(SPECIALIZATIONS, {
    typingSpeed: 70,
    deletingSpeed: 35,
    pauseDuration: 1800,
  });

  return (
    <section id="hero" className="heroSection">
      <div className="heroCard">
        <div className="heroImageContainer">
          <img
            src={heroImage}
            alt="Преподаватель в аудитории делится знаниями"
            className="heroImage"
          />
        </div>

        <div className="heroContent">
          <div className="heroTextGroup">
            {/* Заголовок со встроенной печатной машинкой, строго зафиксированной по строкам */}
            <h1 className="heroTitle">
              <span className="heroTitleLine">Наши лекторы — признанные специалисты в</span>
              <span className="typewriterLine">
                <span className="typewriterWord">{currentText}</span>
                <span className="typewriterCursor" aria-hidden="true">|</span>
              </span>
              <span className="heroTitleLine">готовые делиться опытом и знаниями.</span>
            </h1>

          </div>

          <div className="heroAction">
            <button
              type="button"
              className="heroFindBtn"
              onClick={onFindLecturer}
            >
              <span>НАЙТИ ЛЕКТОРА</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
