import { partnersData } from '../../data/partnersData';
import './Partners.css';

function Partners() {
  return (
    <section id="partners" className="partnersSection">
      <div className="partnersSectionHeader">
        <h2 className="partnersSectionTitle">Наши партнеры</h2>
        <p className="partnersSectionSubtitle">
          Ведущие корпорации и организации, доверяющие нашей учебной платформе
        </p>
      </div>

      <div className="partnersGrid">
        {partnersData.map((partner) => (
          <article key={partner.id} className="partnerCard">
            <div className="partnerTop">
              <div className="partnerLogoWrapper">
                <img
                  src={partner.logo}
                  alt={`Логотип ${partner.name}`}
                  className="partnerLogo"
                />
              </div>

              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className="partnerLinkIcon"
                title={`Перейти на сайт ${partner.name}`}
                aria-label={`Перейти на сайт ${partner.name}`}
              >
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="partnerDescription">{partner.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Partners;
