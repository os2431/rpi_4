import { useState, useEffect } from 'react';
import './BookingModal.css';

function BookingModal({ lecturer, discipline, onClose }) {
  const [selectedTariff, setSelectedTariff] = useState(
    lecturer?.tariffs[0]?.name || ''
  );
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    format: 'Онлайн (Zoom / Яндекс Телемост)',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!lecturer) return null;

  const currentTariffObj =
    lecturer.tariffs.find((t) => t.name === selectedTariff) ||
    lecturer.tariffs[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modalOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modalWindow" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modalCloseBtn"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h3 className="modalTitle">Запись на занятие</h3>

            {/* Карточка с выбранным преподавателем */}
            <div className="modalLecturerSummary">
              <img
                src={lecturer.photo}
                alt={lecturer.name}
                className="modalLecturerThumb"
              />
              <div>
                <div className="modalLecturerName">{lecturer.name}</div>
                <div className="modalLecturerSubject">
                  {discipline ? discipline.title : lecturer.disciplines[0].title}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bookingForm">
              {/* Выбор тарифа */}
              <div className="formFieldGroup">
                <label className="formLabel">Выберите тариф:</label>
                <div className="tariffsRadioGroup">
                  {lecturer.tariffs.map((t, idx) => (
                    <label
                      key={idx}
                      className={`tariffRadioLabel ${selectedTariff === t.name ? 'selected' : ''}`}
                    >
                      <div className="tariffRadioLeft">
                        <input
                          type="radio"
                          name="tariff"
                          value={t.name}
                          checked={selectedTariff === t.name}
                          onChange={(e) => setSelectedTariff(e.target.value)}
                        />
                        <span>{t.name}</span>
                      </div>
                      <span className="tariffRadioPrice">{t.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Поля формы */}
              <div className="formFieldGroup">
                <label htmlFor="studentName" className="formLabel">Ваше имя:</label>
                <input
                  id="studentName"
                  name="name"
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  className="formInput"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formFieldGroup">
                <label htmlFor="studentPhone" className="formLabel">Телефон для связи:</label>
                <input
                  id="studentPhone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  className="formInput"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formFieldGroup">
                <label htmlFor="studentEmail" className="formLabel">Электронная почта (Email):</label>
                <input
                  id="studentEmail"
                  name="email"
                  type="email"
                  required
                  placeholder="ivan@example.com"
                  className="formInput"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formFieldGroup">
                <label htmlFor="formatSelect" className="formLabel">Формат занятий:</label>
                <select
                  id="formatSelect"
                  name="format"
                  className="formSelect"
                  value={formData.format}
                  onChange={handleInputChange}
                >
                  <option value="Онлайн (Zoom / Яндекс Телемост)">Онлайн (Zoom / Яндекс Телемост)</option>
                  <option value="Оффлайн (в аудитории платформы)">Оффлайн (в аудитории платформы)</option>
                  <option value="Корпоративный выезд">Корпоративный выезд в офис заказчика</option>
                </select>
              </div>

              <div className="formFieldGroup">
                <label htmlFor="comment" className="formLabel">Пожелания или удобное время (опционально):</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="2"
                  placeholder="Например, удобны вторники и четверги после 18:00..."
                  className="formTextarea"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="bookingSubmitBtn">
                Подтвердить запись ({currentTariffObj.price})
              </button>
            </form>
          </>
        ) : (
          <div className="bookingSuccessBox">
            <div className="successIconBadge">✓</div>
            <h4 className="successTitle">Заявка успешно отправлена!</h4>
            <p className="successDetails">
              Спасибо, <strong>{formData.name}</strong>! Мы забронировали для вас курс{' '}
              <strong>
                «{discipline ? discipline.title : lecturer.disciplines[0].title}»
              </strong>{' '}
              у преподавателя <strong>{lecturer.name}</strong> по тарифу «{currentTariffObj.name}».
            </p>
            <p className="successDetails">
              В ближайшее время координатор платформы свяжется с вами по номеру{' '}
              <strong>{formData.phone}</strong> для подтверждения расписания.
            </p>
            <button
              type="button"
              className="bookingSubmitBtn"
              style={{ width: '100%' }}
              onClick={onClose}
            >
              Отлично, закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
