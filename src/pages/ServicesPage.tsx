import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Globe, Layout, Smartphone, PenTool, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    tagline: 'Your digital home, built to impress.',
    description: 'We craft high-performance, visually stunning websites that convert visitors into customers. From architecture to deployment — we handle it all.',
    features: [
      'Custom design, zero templates',
      'Mobile-first responsive layout',
      'SEO-optimized structure',
      'Fast loading & performance tuned',
      'CMS integration available',
    ],
    gradient: 'from-brand-purple to-brand-pink',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    tagline: 'Design that speaks before words do.',
    description: 'Beautiful, intuitive user experiences built in Figma — from wireframes to polished design systems that your developers will love.',
    features: [
      'User research & personas',
      'Wireframes to high-fidelity mockups',
      'Interactive Figma prototypes',
      'Design system creation',
      'Accessibility-first approach',
    ],
    gradient: 'from-brand-pink to-brand-orange',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    icon: Layout,
    title: 'Landing Pages',
    tagline: 'Pages that convert. Every time.',
    description: 'High-converting landing pages designed to capture leads, announce products and drive action — built fast, built beautifully.',
    features: [
      'Conversion-optimized layout',
      'A/B test-ready structure',
      'Integrated analytics hooks',
      'Form & CTA optimization',
      '24-hour turnaround available',
    ],
    gradient: 'from-brand-orange to-brand-purple',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    icon: Smartphone,
    title: 'Portfolio Websites',
    tagline: 'Stand out. Get noticed. Get hired.',
    description: 'Personal portfolio sites that make a powerful first impression — for developers, designers, photographers and professionals.',
    features: [
      'Personal branding focused',
      'Work showcase galleries',
      'Contact & inquiry integration',
      'Social media links',
      'Fast delivery — 3-5 days',
    ],
    gradient: 'from-brand-purple to-brand-orange',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

const processSteps = [
  { n: '01', title: 'Discovery', desc: 'We understand your goals, audience and brand vision.' },
  { n: '02', title: 'Design', desc: 'High-fidelity mockups crafted to perfection before any code.' },
  { n: '03', title: 'Build', desc: 'Clean, performant development with modern standards.' },
  { n: '04', title: 'Launch', desc: 'Deployment, testing and handover — you own everything.' },
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

export default function ServicesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useReveal();

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';
  const textFaint = isDark ? 'text-white/25' : 'text-dark-bg/25';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';

  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-16 reveal">
          <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
            NextStep Learning — Services
          </div>
          <h1 className={`text-[clamp(2.3rem,5vw,4.8rem)] font-display font-black leading-none mb-4 ${textPrimary}`}>
            Premium Digital<br />
            <span className="gradient-text">Solutions</span>
          </h1>
          <p className={`max-w-lg text-base lg:text-lg leading-relaxed ${textMuted}`}>
            For businesses that want to make a real impact online — built by people who understand design and strategy.
          </p>
        </div>

        {/* ── Services — alternating editorial layout ── */}
        <div className="space-y-5 mb-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                isDark ? 'bg-dark-card border-dark-border hover:shadow-brand-purple/8' : 'bg-white border-light-border shadow-sm hover:shadow-brand-purple/8'
              } reveal`}
              data-delay={`${i * 80}`}
            >
              <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                {/* Image */}
                <div className="lg:w-2/5 relative h-52 lg:h-auto overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-55`} />
                  <div className="absolute inset-0 flex items-end p-7">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <service.icon size={22} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-3/5 p-7 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className={`text-xs font-semibold tracking-widest uppercase mb-2 ${textFaint}`}>
                      {service.title}
                    </div>
                    <h3 className={`text-2xl lg:text-3xl font-display font-black leading-tight mb-3 ${textPrimary}`}>
                      {service.tagline}
                    </h3>
                    <p className={`text-sm leading-[1.8] mb-6 ${textMuted}`}>{service.description}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 mb-6">
                      {service.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5">
                          <CheckCircle2 size={13} className="text-brand-purple flex-shrink-0" />
                          <span className={`text-xs ${isDark ? 'text-white/65' : 'text-dark-bg/65'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <NavLink
                    to="/contact"
                    className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-all hover:scale-105"
                  >
                    Get a Quote <ArrowRight size={14} />
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Process ── */}
        <div className={`border-t pt-16 ${divider}`}>
          <div className="flex items-center gap-4 mb-12 reveal">
            <div className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>Our Process</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 reveal ${
                  isDark ? 'border-white/8 hover:border-brand-purple/25' : 'border-dark-bg/8 hover:border-brand-purple/25'
                }`}
                data-delay={`${i * 80}`}
              >
                <div className={`text-4xl font-display font-black mb-4 ${isDark ? 'text-white/8' : 'text-dark-bg/8'}`}>
                  {step.n}
                </div>
                <h4 className={`font-display font-bold text-base mb-2 ${textPrimary}`}>{step.title}</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <p className={`text-sm mb-5 ${textMuted}`}>Ready to get started? Let's talk about your project.</p>
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all hover:scale-105 shadow-lg hover:shadow-brand-purple/30"
            >
              Start a Project <ArrowUpRight size={14} />
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
}
