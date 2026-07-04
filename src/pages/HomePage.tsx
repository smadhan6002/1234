import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  MoveRight,
  BookOpen,
  Globe,
  Briefcase,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setTimeout(() => el.classList.add('visible'), Number(el.dataset.delay || 0));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.45 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const stats = [
  { value: '1000+', label: 'Students' },
  { value: '8+', label: 'Domains' },
  { value: '100%', label: 'Practical Learning' },
  { value: '3', label: 'Internship Programs' },
];


export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useReveal();

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';
  const textFaint = isDark ? 'text-white/25' : 'text-dark-bg/25';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';

  return (
<div
className={`relative overflow-hidden ${
isDark

? 'bg-dark-bg'

: 'bg-gradient-to-b from-[#F8FAFC] via-[#F3F5F9] to-[#EEF2FF]'
}`}

>    <div
className={`absolute top-10 left-0 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none ${
isDark

? 'bg-brand-purple/12'

: 'bg-brand-purple/20'
}`}
/>

<div
className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none ${
isDark

? 'bg-brand-pink/12'

: 'bg-brand-pink/18'
}`}
/>

<div
className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[220px] pointer-events-none ${
isDark

? 'bg-brand-orange/8'

: 'bg-brand-orange/14'
}`}
/>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[72vh] flex flex-col justify-center items-center text-center overflow-hidden pt-24 pb-8">

        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="orb absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-brand-purple/[0.12] blur-[140px]" />
          <div className="orb-delayed absolute bottom-[25%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-pink/[0.10] blur-[120px]" />
          <div className="orb-slow absolute top-[55%] left-[50%] w-[300px] h-[300px] rounded-full bg-brand-orange/[0.07] blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          {/* Headline */}
          <div className="mb-6">
            <h1 className="text-hero">
              <div
                className={`flex items-center justify-center gap-3 text-[clamp(2rem,5.5vw,5rem)] mb-1 reveal ${textPrimary}`}
                data-delay="60"
              >
                <span>Empowering</span>

                <span className="gradient-text">
                  Students
                </span>
              </div>

              <div
                className={`flex items-center justify-center gap-3 text-[clamp(2rem,5.5vw,5rem)] reveal`}
                data-delay="140"
              >
                <span className={textPrimary}>
                  Elevating
                </span>

                <span className="gradient-text">
                  Businesses
                </span>
              </div>
            </h1>
          </div>

          {/* Sub */}
          <p
            className={`max-w-xl mx-auto text-base lg:text-lg leading-relaxed mb-8 reveal ${textMuted}`}
            data-delay="220"
          >
            Practical learning, real-world experiences and digital solutions that create growth.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 reveal" data-delay="300">
            <NavLink
              to="/courses"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-semibold text-sm hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-brand-purple/40 hover:scale-105 active:scale-95"
            >
              Launch Your Career
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </NavLink>
            <NavLink
              to="/services"
              className={`group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 border hover:scale-105 active:scale-95 ${
                isDark ? 'border-white/15 text-white/70 hover:border-white/30 hover:text-white' : 'border-dark-bg/15 text-dark-bg/70 hover:border-dark-bg/30 hover:text-dark-bg'
              }`}
            >
              Our Services
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COURSES TICKER
      ══════════════════════════════════════════ */}
      <div
  className={`py-3 border-y overflow-hidden ${
    isDark ? 'border-white/6' : 'border-dark-bg/8'
  }`}
>

  <div className="ticker-track flex items-center gap-16 whitespace-nowrap w-max">

    {[
      'Courses',

      'Internships',

      'Webinars',

      'Bootcamps',

      'Services',

      'Courses',

      'Internships',

      'Webinars',

      'Bootcamps',

      'Services',
    ].map((item, i) => (

      <div key={i} className="flex items-center gap-16">

        <span
          className={`text-sm font-semibold uppercase tracking-[4px] ${
            isDark ? 'text-white/60' : 'text-dark-bg/60'
          }`}
        >

          {item}

        </span>

        <span className="w-2 h-2 rounded-full bg-brand-purple" />

      </div>

    ))}

  </div>

</div>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
        <section
className={`py-20 px-6 ${
isDark

? ''

: 'bg-white'
}`}
>        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-4 divide-x ${isDark ? 'divide-white/8' : 'divide-dark-bg/8'}`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="px-8 py-6 text-center first:pl-0 last:pr-0 reveal" data-delay={`${i * 80}`}>
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-display font-black gradient-text leading-none mb-2">
                  {stat.value}
                </div>
                <div className={`text-xs font-semibold tracking-widest uppercase ${textMuted}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          JOURNEY
      ══════════════════════════════════════════ */}
<section
className={`py-20 px-6 border-t ${
divider
} ${
isDark

? ''

: 'bg-[#FAFBFD]'
}`}
>        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 reveal">
            <div className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>01 — Your Journey</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', label: 'Learn', sub: 'Industry-aligned courses built for real practice.' },
              { num: '02', label: 'Build', sub: 'Internships and live projects to apply your skills.' },
              { num: '03', label: 'Launch', sub: 'Digital solutions that put your work in front of the world.' },
              { num: '04', label: 'Grow', sub: 'A community that scales with you.' },
            ].map((step, i) => (
              <div
                key={step.label}
                className={`relative p-8 group rounded-2xl border transition-all duration-500 hover:-translate-y-1 reveal ${
                  isDark ? 'border-white/6 hover:border-brand-purple/30' : 'border-dark-bg/8 hover:border-brand-purple/30'
                }`}
                data-delay={`${i * 100}`}
              >
                <div className={`text-[clamp(3rem,7vw,5.5rem)] font-display font-black leading-none mb-6 select-none transition-all duration-500 ${
                  isDark ? 'text-white/6 group-hover:text-white/12' : 'text-dark-bg/6 group-hover:text-dark-bg/12'
                }`}>
                  {step.num}
                </div>
                <h3 className="text-3xl font-display font-black mb-3 gradient-text">{step.label}</h3>
                <p className={`text-sm leading-relaxed ${textMuted}`}>{step.sub}</p>
                <div className="mt-6 w-8 h-0.5 bg-gradient-to-r from-brand-purple to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE OFFER — Courses + Internships + Services overview
      ══════════════════════════════════════════ */}
<section
className={`py-20 px-6 border-t ${
divider
} ${
isDark

? ''

: 'bg-white'
}`}
>        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 reveal">
            <div className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>02 — What We Offer</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Courses */}
            <div
              className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl reveal-left ${
                isDark ? 'bg-dark-card border-dark-border hover:shadow-brand-purple/10' : 'bg-white border-light-border shadow-sm hover:shadow-brand-purple/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/6 to-brand-pink/4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>Courses</span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-lg">
                    <BookOpen size={16} className="text-white" />
                  </div>
                </div>
                <h3 className={`text-2xl font-display font-black leading-tight mb-4 ${textPrimary}`}>
                  Build skills that open doors.
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${textMuted}`}>
                  8 programs across technology, design and data — built around doing, not just watching.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Python', 'AI & ML', 'UI/UX', 'Full Stack'].map(t => (
                    <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${isDark ? 'border-white/10 text-white/55' : 'border-dark-bg/10 text-dark-bg/55'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <NavLink to="/courses" className="group/link inline-flex items-center gap-2 text-brand-purple font-semibold text-sm hover:text-brand-pink transition-colors">
                    View all courses <MoveRight size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Internships */}
            <div
              className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl reveal ${
                isDark ? 'bg-dark-card border-dark-border hover:shadow-brand-pink/10' : 'bg-white border-light-border shadow-sm hover:shadow-brand-pink/10'
              }`}
              data-delay="100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/6 to-brand-orange/4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>Internships</span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-brand-orange flex items-center justify-center shadow-lg">
                    <Briefcase size={16} className="text-white" />
                  </div>
                </div>
                <h3 className={`text-2xl font-display font-black leading-tight mb-4 ${textPrimary}`}>
                  Real projects. Real mentors.
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${textMuted}`}>
                  Training-based and project-based internships from 15 days to 2 months.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Training Based', 'Project Based', '15 Days – 2 Months'].map(t => (
                    <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${isDark ? 'border-white/10 text-white/55' : 'border-dark-bg/10 text-dark-bg/55'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <NavLink to="/internships" className="group/link inline-flex items-center gap-2 text-brand-pink font-semibold text-sm hover:text-brand-orange transition-colors">
                    View internships <MoveRight size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Services */}
            <div
              className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl reveal-right ${
                isDark ? 'bg-dark-card border-dark-border hover:shadow-brand-orange/10' : 'bg-white border-light-border shadow-sm hover:shadow-brand-orange/10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/6 to-brand-purple/4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>Services</span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-pink flex items-center justify-center shadow-lg">
                    <Globe size={16} className="text-white" />
                  </div>
                </div>
                <h3 className={`text-2xl font-display font-black leading-tight mb-4 ${textPrimary}`}>
                  Your digital presence, elevated.
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${textMuted}`}>
                  Websites, landing pages, portfolios and UI/UX design for businesses that mean business.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Websites', 'Landing Pages', 'UI/UX', 'Portfolios'].map(t => (
                    <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${isDark ? 'border-white/10 text-white/55' : 'border-dark-bg/10 text-dark-bg/55'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <NavLink to="/services" className="group/link inline-flex items-center gap-2 text-brand-orange font-semibold text-sm hover:text-brand-pink transition-colors">
                    View services <MoveRight size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY
      ══════════════════════════════════════════ */}
<section
className={`py-20 px-6 border-t ${
divider
} ${
isDark

? ''

: 'bg-[#FAFBFD]'
}`}
>        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-14 reveal">
            <div className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>03 — Community</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className={`relative rounded-3xl overflow-hidden border ${isDark ? 'border-white/8' : 'border-dark-bg/8'} reveal`}>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/15 via-brand-pink/8 to-brand-orange/10" />
              <div className={`absolute inset-0 ${isDark ? 'bg-dark-card/70' : 'bg-white/70'}`} />
            </div>

            <div className="relative p-10 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <MessageCircle size={15} className="text-white" />
                  </div>
                  <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">WhatsApp Community</span>
                </div>
                <h2 className={`text-[clamp(1.8rem,4vw,3.5rem)] font-display font-black leading-tight mb-4 ${textPrimary}`}>
                  Join The NextStep<br />Community
                </h2>
                <p className={`text-base leading-relaxed ${textMuted}`}>
                  Become part of a growing network where students discover opportunities, internships, resources and updates together.
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href="https://chat.whatsapp.com/KrxqMd7V0T3GPQKjyzxlc0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-bold text-sm transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-400/40 hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={20} />
                  Join Community
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className={`py-20 px-6 border-t ${divider}`}>
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-pink/80 to-brand-orange/60" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
            }} />
            <div className="relative px-10 lg:px-16 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-3">
                  Ready to take your<br />next step?
                </h2>
                <p className="text-white/65 text-base max-w-md">
                  Whether you're a student ready to grow or a business ready to scale — we have the right path for you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <NavLink to="/internships" className="px-7 py-3.5 bg-white text-brand-purple font-bold text-sm rounded-xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl">
                  Launch Your Career
                </NavLink>
                <NavLink to="/contact" className="px-7 py-3.5 bg-white/15 border border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-all hover:scale-105">
                  Contact Us
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
