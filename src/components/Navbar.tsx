import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Events', to: '/events' },
  { label: 'Courses', to: '/courses' },
  { label: 'Internships', to: '/internships' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isDark = theme === 'dark';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? `mx-6 mt-2 rounded-xl border shadow-2xl ${
                isDark
                  ? 'glass border-white/10 bg-black/50 shadow-black/40'
                  : 'glass-light border-dark-bg/8 shadow-dark-bg/10'
              }`
            : 'mx-0 mt-0'
        }`}
      >
        <div className={`max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'px-3 py-1' : 'px-6 lg:px-10 py-2'
        }`}>

          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0 group">
            <img
              src="/Side_transperent.png"
              alt="NextStep Learning"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-12' : 'h-16'}`}
            />
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[15px] font-semibold rounded-xl transition-all duration-200 select-none ${
                    isActive
                      ? 'text-brand-purple'
                      : isDark
                        ? 'text-white/85 hover:text-white'
                        : 'text-dark-bg/55 hover:text-dark-bg/90'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-3 bottom-1.5 h-px bg-gradient-to-r from-brand-purple to-brand-pink rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-white/40 hover:text-white/80 hover:bg-white/8'
                  : 'text-dark-bg/40 hover:text-dark-bg/80 hover:bg-dark-bg/8'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
            </button>

            <NavLink
              to="/internships"
              className="inline-flex items-center px-5 py-2 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-brand-purple/30 hover:scale-105 active:scale-95"
            >
              Get Started
            </NavLink>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'text-white/50' : 'text-dark-bg/50'}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-dark-bg/70 hover:text-dark-bg'}`}
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

        {/* Panel */}
        <div
          className={`absolute top-20 inset-x-4 rounded-2xl border p-4 transition-all duration-400 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          } ${isDark ? 'glass border-white/10 shadow-2xl' : 'glass-light border-dark-bg/10 shadow-xl'}`}
        >
          <div className="space-y-0.5 mb-4">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-purple/12 text-brand-purple'
                      : isDark
                        ? 'text-white/65 hover:text-white hover:bg-white/5'
                        : 'text-dark-bg/65 hover:text-dark-bg hover:bg-dark-bg/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className={`pt-3 border-t ${isDark ? 'border-white/8' : 'border-dark-bg/8'}`}>
            <NavLink
              to="/internships"
              className="block px-4 py-3 text-sm font-bold text-white text-center rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
