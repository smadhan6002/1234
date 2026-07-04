import { useEffect, useState } from 'react';
import { CheckCircle2, Calendar, ArrowRight, Clock, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import RegistrationModal from '../components/RegistrationModal';
import { NavLink } from 'react-router-dom';
interface DurationOption {
  duration: string;
  label: string;
  highlights: string[];
}

interface Category {
  type: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  overlayGradient: string;
  image: string;
  durations: DurationOption[];
}

const categories: Category[] = [
  {
    type: 'Training Based',
    title: 'Training Based Internship',
    subtitle: 'Structured learning with real-world application.',
    description: 'A mentor-guided program where you follow a structured curriculum, attend sessions and work on assignments that mirror actual industry tasks. Ideal for students who want guided, progressive learning.',
    gradient: 'from-brand-pink to-brand-orange',
    overlayGradient: 'from-brand-purple/20 to-brand-pink/10',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900',
    durations: [
      {
        duration: '15 Days',
        label: '15 Days',
highlights: [

'Training on weekdays',

'Mentor-guided sessions',

'Hands-on tasks',

'Certificate of completion'

],      },
      {
        duration: '1 Month',
        label: '1 Month',
highlights: [

'Training on weekends',

'Hands-on activities',

'Mini project',

'Certificate of completion'

],      },
      {
        duration: '2 Months',
        label: '2 Months',
highlights: [

'Training on weekdays',

'Advanced hands-on tasks',

'Capstone project',

'Certificate of completion'

],     },
    ],
  },
  {
    type: 'Project Based',
    title: 'Project Based Internship',
    subtitle: 'Ownership-driven experience on live builds.',
    description: 'A hands-on program where you work directly on real client or internal projects. Less structured, more independent — you own a feature, a product, or a deliverable from start to finish.',
    gradient: 'from-brand-pink to-brand-orange',
    overlayGradient: 'from-brand-pink/20 to-brand-orange/10',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900',
    durations: [
      {
duration: '15 Days',

label: '15 Days',

highlights: [

'Mini live project',

'Mentor guidance',

'Hands-on implementation',

'Certificate of completion'

],

},
      {
        duration: '1 Month',
        label: '1 Month',
highlights: [

'Live project ownership',

'Regular project reviews',

'Portfolio-ready output',

'Certificate of completion'

],      },
      {
        duration: '2 Months',
        label: '2 Months',
highlights: [

'End-to-end project execution',

'Regular project reviews',

'Industry-level output',

'Certificate of Completion'

],      },
    ],
  },
];

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
      { threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function InternshipsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [modal, setModal] = useState<string | null>(null);
  useReveal();

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';
  const textFaint = isDark ? 'text-white/25' : 'text-dark-bg/25';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';
  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {modal && (
        <RegistrationModal type="internship" itemName={modal} onClose={() => setModal(null)} />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-16 reveal">
          <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
            NextStep Learning — Internships
          </div>
          <h1 className={`text-[clamp(2.3rem,5vw,4.8rem)] font-display font-black leading-none mb-4 ${textPrimary}`}>
            Real Experience.<br />
            <span className="gradient-text">
              Real Growth
            </span>
          </h1>
          <p className={`max-w-lg text-base lg:text-lg leading-relaxed ${textMuted}`}>
            Two internship tracks designed around how you learn best — choose the format that fits your goals.
          </p>
        </div>

        {/* ── Categories ── */}
        <div className="space-y-6">
          {categories.map((cat, ci) => (
            <div
              key={cat.type}
              className={`rounded-3xl border overflow-hidden reveal ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'}`}
              data-delay={`${ci * 100}`}
            >
              {/* Category Header */}
              <div className={`relative overflow-hidden ${ci % 2 === 0 ? '' : ''}`}>
                <div className="flex flex-col lg:flex-row">

                  {/* Image panel */}
                  <div className="relative lg:w-2/5 h-52 lg:h-auto overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-65`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 p-7 flex flex-col justify-end">
                      <div className="inline-flex self-start px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase mb-3">
                        {cat.type}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-display font-black text-white leading-tight">
                        {cat.title}
                      </h2>
                      <p className="text-white/70 text-sm mt-1">{cat.subtitle}</p>
                    </div>
                  </div>

                  {/* Description panel */}
                  <div className="lg:w-3/5 p-7 lg:p-10 flex flex-col justify-center">
                    <p className={`text-sm leading-[1.9] mb-6 ${textMuted}`}>{cat.description}</p>
                    <div className={`flex items-center gap-2 text-xs font-semibold ${textFaint}`}>
                      <Clock size={12} />
                      <span>{cat.durations.map(d => d.label).join(' · ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration Options */}
              <div className={`border-t ${divider}`}>
                <div className={`grid divide-x ${
                  cat.durations.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
                } ${isDark ? 'divide-white/8' : 'divide-dark-bg/8'}`}>
                  {cat.durations.map((dur, di) => (
                    <div
                      key={dur.duration}
                      className={`group p-6 lg:p-8 transition-all duration-300 reveal ${
                        isDark ? 'hover:bg-white/3' : 'hover:bg-dark-bg/2'
                      }`}
                      data-delay={`${ci * 100 + di * 80}`}
                    >
                      {/* Duration label */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className={`text-3xl font-display font-black gradient-text leading-none mb-1`}>
                            {dur.label}
                          </div>
                          <div className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>
                            {cat.type}
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6">
                        {dur.highlights.map(h => (
                          <li key={h} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-brand-purple flex-shrink-0 mt-0.5" />
                            <span className={`text-xs leading-relaxed ${textMuted}`}>{h}</span>
                          </li>
                        ))}
                      </ul>
                      {/* Pricing */}

<div
className={`mb-6 rounded-2xl border overflow-hidden ${
isDark

? 'border-dark-border bg-white/5'

: 'border-light-border bg-light-muted'
}`}

>

{cat.type === 'Training Based' ? (

<>

<div className="flex items-center justify-between px-4 py-3 border-b border-white/10">

<span className={`text-xs font-semibold ${textMuted}`}>

Individual

</span>

<span className="font-bold text-brand-purple">

{dur.label === '15 Days'

? '₹299'

: dur.label === '1 Month'

? '₹499'

: '₹599'}

</span>

</div>

<div className="flex items-center justify-between px-4 py-3">

<span className={`text-xs font-semibold ${textMuted}`}>

Team of 5

</span>

<span className="font-bold text-brand-purple">

{dur.label === '15 Days'

? '₹1199'

: dur.label === '1 Month'

? '₹1999'

: '₹2499'}

</span>

</div>

</>

) : (

<div className="flex items-center justify-between px-4 py-3">

<span className={`text-xs font-semibold ${textMuted}`}>

Individual

</span>

<span className="font-bold text-brand-purple">

{dur.label === '15 Days'

? '₹199'

: dur.label === '1 Month'

? '₹299'

: '₹399'}

</span>

</div>

)}

</div>
                      <button
                        onClick={() => setModal(`${cat.title} — ${dur.label}`)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 hover:scale-105 bg-gradient-to-r ${cat.gradient}`}
                      >
                        Apply <ArrowUpRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Info Banner ── */}
        <div
          className={`mt-8 p-8 lg:p-10 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'}`}
          data-delay="100"
        >
          <div>
            <Calendar className="mb-3 text-brand-purple" size={22} />
            <h3 className={`text-lg font-display font-bold mb-1 ${textPrimary}`}>Flexible Start Dates</h3>
            <p className={`text-sm max-w-md ${textMuted}`}>
              All programs have rolling enrollment. Register today and we'll onboard you at the next available cohort.
            </p>
          </div>
          <NavLink

to="/contact"

className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:text-brand-pink transition-colors"

>

Contact us for details

<ArrowRight size={14} />

</NavLink>
        </div>

      </div>
    </div>
  );
}
