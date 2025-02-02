import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Register from './pages/Register.tsx';
import { BrowserRouter, Routes, Route } from 'react-router'
import AccountDetails from './pages/AccountDetails.tsx';
import BookingStatus from './pages/BookingStatus.tsx';
import BookingEmail from './pages/BookingEmail.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route index element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path='/booking-email' element={<BookingEmail />} />
        <Route path='/booking-status/:id' element={<BookingStatus />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
