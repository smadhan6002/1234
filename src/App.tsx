import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import InternshipsPage from './pages/InternshipsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import PaymentPage from './pages/PaymentPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function Layout() {

const { theme } = useTheme();

const isDark = theme === 'dark';

const location = useLocation();

const isAdminPage =
location.pathname.startsWith('/dashboard') ||

location.pathname === '/admin';

return (

<div

className={

isDark

? 'bg-dark-bg text-white'

: 'bg-light-bg text-dark-bg'

}

>

<ScrollToTop />

{!isAdminPage && <Navbar />}

<main>

<Routes>

<Route path="/" element={<HomePage />} />

<Route path="/events" element={<EventsPage />} />

<Route path="/courses" element={<CoursesPage />} />

<Route path="/internships" element={<InternshipsPage />} />

<Route path="/services" element={<ServicesPage />} />

<Route path="/about" element={<AboutPage />} />

<Route path="/contact" element={<ContactPage />} />

<Route path="/payment" element={<PaymentPage />} />

<Route path="/admin" element={<AdminLogin />} />

<Route path="/dashboard" element={<AdminDashboard />} />

</Routes>

</main>

{!isAdminPage && <Footer />}

</div>

);

}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
