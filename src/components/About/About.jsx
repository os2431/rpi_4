import './About.css';

function About() {
  return (
    <section id="about" className="aboutSection">
      <div className="aboutContentBox">
        <h2 className="aboutTitle">О нас</h2>
        
        <p className="aboutManifesto">
          Наша учебная платформа соединяет компании, образовательные учреждения и НКО с
          профессиональными лекторами, спикерами и тренерами. Мы упрощаем процесс подбора,
          бронирования и организации лекций, помогая находить экспертов, которые не просто делятся
          знаниями, но и вдохновляют аудиторию.
        </p>

        <div className="aboutKeyMetrics">
          <div className="metricCard">
            <span className="metricNumber">10</span>
            <span className="metricLabel">Ведущих академических лекторов</span>
          </div>
          <div className="metricCard">
            <span className="metricNumber">30</span>
            <span className="metricLabel">Авторских дисциплин и программ</span>
          </div>
          <div className="metricCard">
            <span className="metricNumber">300+</span>
            <span className="metricLabel">Тщательно проработанных тем</span>
          </div>
          <div className="metricCard">
            <span className="metricNumber">100%</span>
            <span className="metricLabel">Онлайн и оффлайн форматы</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
