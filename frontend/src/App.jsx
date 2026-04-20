import React, { useState } from 'react'
import Navbar           from './components/Navbar.jsx'
import Footer           from './components/Footer.jsx'
import HomePage         from './pages/HomePage.jsx'
import CampsPage        from './pages/CampsPage.jsx'
import BookingPage      from './pages/BookingPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import AvailabilityPage from './pages/AvailabilityPage.jsx'
import AdminPage        from './pages/AdminPage.jsx'

export default function App() {
  const [page, setPage]     = useState('home')
  const [booking, setBooking] = useState(null)

  const nav = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleBookingSuccess = (b) => {
    setBooking(b)
    nav('confirm')
  }

  const showFooter = !['admin'].includes(page)

  return (
    <div>
      <Navbar page={page} onNav={nav} />
      {page === 'home'         && <HomePage       onBook={() => nav('book')} onCamps={() => nav('camps')} />}
      {page === 'camps'        && <CampsPage       onBook={() => nav('book')} />}
      {page === 'book'         && <BookingPage     onSuccess={handleBookingSuccess} />}
      {page === 'confirm'      && <ConfirmationPage booking={booking} onHome={() => nav('home')} onBook={() => nav('book')} />}
      {/* {page === 'availability' && <AvailabilityPage onBook={() => nav('book')} />} */}
      {page === 'admin'        && <AdminPage />}
      {showFooter && <Footer />}
    </div>
  )
}
