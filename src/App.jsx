import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Partners from './components/Partners/Partners';
import About from './components/About/About';
import LecturersSection from './components/Lecturers/LecturersSection';
import BookingModal from './components/BookingModal/BookingModal';
import Footer from './components/Footer/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'lecturers'
  const [bookingState, setBookingState] = useState({
    isOpen: false,
    lecturer: null,
    discipline: null,
  });

  const handleNavigate = (page, sectionId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home' && sectionId && sectionId !== 'hero') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    }
  };

  const handleOpenBooking = (lecturer, discipline) => {
    setBookingState({
      isOpen: true,
      lecturer,
      discipline,
    });
  };

  const handleCloseBooking = () => {
    setBookingState({
      isOpen: false,
      lecturer: null,
      discipline: null,
    });
  };

  return (
    <div className="platformApp">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onFindLecturer={() => handleNavigate('lecturers')} />
            <Partners />
            <About />
          </>
        ) : (
          <LecturersSection onBook={handleOpenBooking} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {bookingState.isOpen && (
        <BookingModal
          lecturer={bookingState.lecturer}
          discipline={bookingState.discipline}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
}

export default App;
