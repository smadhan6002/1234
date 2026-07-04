import { NavLink } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Events', to: '/events' },
      { label: 'Courses', to: '/courses' },
      { label: 'Internships', to: '/internships' },
      { label: 'Services', to: '/services' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'For Students',
    links: [
      { label: 'Python Programming', to: '/courses' },
      { label: 'Java Programming', to: '/courses' },
      { label: 'UI/UX Design', to: '/courses' },
      { label: 'Web Development', to: '/courses' },
      { label: 'Full Stack Development', to: '/courses' },
      { label: 'Data Science', to: '/courses' },
      { label: 'Data Analytics', to: '/courses' },
      { label: 'AI & ML', to: '/courses' },
    ],
  },
  {
    title: 'For Businesses',
    links: [
      { label: 'Website Development', to: '/services' },
      { label: 'UI/UX Design', to: '/services' },
      { label: 'Landing Pages', to: '/services' },
      { label: 'Portfolio Websites', to: '/services' },
      { label: 'Events', to: '/events' },
    ],
  },
];

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/nextstep__learning', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/nextstep-learning-official/', label: 'LinkedIn' },
  { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=queries.nextsteplearning@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://chat.whatsapp.com/KrxqMd7V0T3GPQKjyzxlc0', label: 'WhatsApp' },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textMuted = isDark ? 'text-white/40' : 'text-dark-bg/40';
  const textFaint = isDark ? 'text-white/20' : 'text-dark-bg/20';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';
  const hoverText = isDark ? 'hover:text-white' : 'hover:text-dark-bg';

  return (
    <footer className={`border-t ${isDark ? 'border-white/8' : 'border-dark-bg/8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/Side_transperent.png"
              alt="NextStep Learning"
              className="h-14 w-auto object-contain opacity-95"
            />
            <p className={`text-sm leading-relaxed max-w-xs mb-6 ${textMuted}`}>
              Empowering Students. Elevating Businesses.<br />
              One ecosystem. Unlimited growth.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 hover:border-brand-purple/40 ${
                    isDark ? 'border-white/8 text-white/35 hover:text-white' : 'border-dark-bg/8 text-dark-bg/35 hover:text-dark-bg'
                  }`}
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map(col => (
            <div key={col.title}>
              <h5 className={`text-[11px] font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
                {col.title}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={`text-sm transition-all duration-200 hover:translate-x-0.5 inline-block ${textMuted} ${hoverText}`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Community CTA strip */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 border-t border-b ${divider} mb-8`}>
          <div>
            <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${textFaint}`}>Community</p>
            <p className={`text-sm ${textMuted}`}>Join 500+ students in our WhatsApp community.</p>
          </div>
          <a
            href="https://chat.whatsapp.com/KrxqMd7V0T3GPQKjyzxlc0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-400 transition-colors flex-shrink-0"
          >
            <MessageCircle size={14} />
            Join Community
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`text-xs ${textFaint}`}>
            &copy; {new Date().getFullYear()} NextStep Learning. All rights reserved.
          </p>
          <p className={`text-xs ${textFaint}`}>
            Built with purpose — for students and businesses.
          </p>
        </div>

      </div>
    </footer>
  );
}
