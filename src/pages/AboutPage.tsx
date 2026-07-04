import { useEffect } from 'react';
import { Heart, Lightbulb, Globe, Users, BookOpen, Sparkles, ArrowUpRight, Quote, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Linkedin } from 'lucide-react';

const values = [
  { icon: Sparkles, label: 'Growth', desc: 'Every person has unlimited potential waiting to be unlocked.' },
  { icon: BookOpen, label: 'Practical Learning', desc: 'Theory is a stepping stone — application is the destination.' },
  { icon: Users, label: 'Community', desc: 'Better together, always. Collective growth over individual gain.' },
  { icon: Lightbulb, label: 'Innovation', desc: 'We evolve continuously to stay ahead of what the industry needs.' },
  { icon: Globe, label: 'Accessibility', desc: 'Quality education and services for everyone, everywhere.' },
  { icon: Heart, label: 'Purpose', desc: 'Everything we do is driven by meaningful, measurable impact.' },
];

const testimonials = [
  {
    quote: "The session was highly informative and engaging. The practical examples and interactive approach made learning enjoyable. I gained valuable insights that will help me in my academic and professional journey.",
    author: "Student",
    college: "Sathyabama Institute of Science and Technology",
    rating: 5
  },
  {
    quote: "The webinar was well-organized and delivered with excellent clarity. It provided practical knowledge and enhanced my understanding of industry expectations.",
    author: "Student",
    college: "Rrase College of Engineering",
    rating: 5
  },
  {
    quote: "I truly appreciate the quality of the sessions conducted by NextStep Learning. The content was relevant, the speaker was knowledgeable, and the overall experience exceeded my expectations.",
    author: "Student",
    college: "Dhanalakshmi College of Engineering",
    rating: 5
  },
  {
    quote: "The webinar helped me improve my confidence and gain practical knowledge beyond the classroom. I look forward to participating in more events organized by NextStep Learning.",
    author: "Student",
    college: "Hindustan Institute of Technology and Science",
    rating: 5
  }
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
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useReveal();

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';
  const textFaint = isDark ? 'text-white/25' : 'text-dark-bg/25';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';
  const stats = [

{

value:'1000+',

label:'Students',

},

{

value:'8+',

label:'Domains',

},

{

value:'2026',

label:'Founded',

},

{

value:'100%',

label:'Practical Learning',

},

];
  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-14 reveal">
          <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
            NextStep Learning — Our Story
          </div>
          
          <h1 className={`text-[clamp(2.3rem,5vw,4.8rem)] font-display font-black leading-none mb-4 ${textPrimary}`}>
            Built with<br />
            <span className="gradient-text">Purpose</span>
          </h1>
        </div>

        {/* ── Story — two column editorial ── */}
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 pb-14 border-b ${divider}`}>
          <div className="reveal-left">
            <h2 className={`text-2xl font-display font-black mb-6 ${textPrimary}`}>Our Story</h2>
            <p className={`text-base lg:text-lg leading-[1.9] mb-5 ${textMuted}`}>
              NextStep Learning was built to bridge the gap between learning and execution. Our goal is to build an ecosystem where students learn, businesses grow and communities thrive together.
            </p>
            <p className={`text-base leading-[1.9] ${textMuted}`}>
              We recognized that most learning platforms teach theory in isolation — disconnected from the real demands of the industry. NextStep is different. We combine structured learning with practical execution, pairing students with internships and helping businesses build a strong digital presence — all within one cohesive ecosystem.
            </p>
          </div>

          <div className="reveal-right">
            {/* Mission pull-quote */}
            <div className={`relative p-8 rounded-3xl border overflow-hidden ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'}`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-purple/10 to-transparent rounded-bl-3xl pointer-events-none" />
              <div className="relative">
                <div className={`text-xs font-semibold tracking-widest uppercase mb-5 ${textFaint}`}>Our Mission</div>
                <p className={`text-2xl lg:text-3xl font-display font-black leading-tight mb-6 ${textPrimary}`}>
                  "To empower students with practical skills and help businesses establish a strong digital presence."
                </p>
                <div className="w-10 h-0.5 bg-gradient-to-r from-brand-purple to-brand-pink" />
                <div className="mt-8">

                <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
                Our Vision
                </div>

                <p className={`text-lg leading-relaxed ${textMuted}`}>

                To create a connected ecosystem where students, professionals and businesses grow together through practical learning and digital transformation.

                </p>

                </div>
              </div>
            </div>
          </div>
        </div>

{/* Statistics */}

<div className={`py-14 border-b ${divider}`}>

<div className="flex items-center gap-4 mb-10 reveal">

<div
className={`text-2xl font-display font-black ${textPrimary}`}
>

At a Glance

</div>

<div
className={`flex-1 h-px ${
isDark ? 'bg-white/8' : 'bg-dark-bg/8'
}`}
/>

</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

{stats.map((stat,i)=>(

<div

key={stat.label}

data-delay={`${i*80}`}

className={`p-8 rounded-2xl border text-center reveal ${
isDark

? 'border-white/8 hover:border-brand-purple/25'

: 'border-dark-bg/8 hover:border-brand-purple/25 bg-white shadow-sm'
}`}

>

<div className="gradient-text text-4xl font-display font-black mb-2">

{stat.value}

</div>

<div className={`text-sm font-semibold ${textMuted}`}>

{stat.label}

</div>

</div>

))}

</div>

</div>

{/* ── Founders — editorial layout ── */}
        
        {/* ── Founders — editorial layout ── */}
        <div className={`py-14 border-b ${divider}`}>
          <div className="flex items-center gap-4 mb-10 reveal">
            <div className={`text-2xl font-display font-black ${textPrimary}`}>The Founders</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {[
              {
                name: 'Akshaya Hemraj',
                role: 'Founder',
                linkedin:'http://www.linkedin.com/in/akshaya-hemraj',
                gradient: 'from-brand-purple to-brand-pink',
                quote: 'We built NextStep to close the gap between learning and doing — creating a space where growth is inevitable.',
                detail: 'Visionary leader with a passion for democratizing quality education and building purposeful digital products that serve both students and businesses.',
              },
              {
                name: 'Ganga A',
                role: 'Co-Founder',
                linkedin:'https://www.linkedin.com/in/ganga-a-aab55a3a8/',
                gradient: 'from-brand-pink to-brand-orange',
                quote: 'Our mission is simple: make quality education accessible and help businesses build digital presence that actually converts.',
                detail: 'Strategic thinker and operations expert committed to creating impact at scale through innovation, community building and purposeful design.',
              },
            ].map((founder, i) => (
              <div
                key={founder.name}
                className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl reveal ${
                  isDark ? 'bg-dark-card border-dark-border hover:shadow-brand-purple/8' : 'bg-white border-light-border shadow-sm hover:shadow-brand-purple/8'
                }`}
                data-delay={`${i * 120}`}
              >
                {/* Top gradient strip */}
                <div className={`h-1.5 bg-gradient-to-r ${founder.gradient}`} />

                <div className="p-8 lg:p-10">
                  {/* Role badge */}
                  <div className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r ${founder.gradient} text-white mb-6`}>
                    {founder.role}
                  </div>

                  {/* Name — large editorial */}
                  <h3 className={`text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-1 ${textPrimary}`}>
                    {founder.name}
                  </h3>

                  <div className={`w-12 h-0.5 bg-gradient-to-r ${founder.gradient} my-6`} />

                  {/* Quote */}
                  <p className={`text-base leading-[1.8] italic mb-4 ${textMuted}`}>
                    "{founder.quote}"
                  </p>

                  {/* Detail */}
                  {/* Detail */}

<p
className={`text-sm leading-relaxed ${
isDark ? 'text-white/35' : 'text-dark-bg/35'
}`}
>

{founder.detail}

</p>

<a

href={founder.linkedin}

target="_blank"

rel="noopener noreferrer"

className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-purple/20 text-brand-purple text-sm font-semibold hover:bg-brand-purple/10 transition-all"

>

<Linkedin size={15} />

Connect on LinkedIn

</a>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Sparkles size={32} className={textPrimary} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Values — mixed grid ── */}
        <div className="py-14">
          <div className="flex items-center gap-4 mb-10 reveal">
            <div className={`text-2xl font-display font-black ${textPrimary}`}>Our Values</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((val, i) => (
              <div
                key={val.label}
                className={`group p-6 rounded-2xl border transition-all duration-400 hover:-translate-y-1 reveal ${
                  isDark
                    ? 'border-white/8 hover:border-brand-purple/25 hover:bg-dark-card'
                    : 'border-dark-bg/8 hover:border-brand-purple/25 bg-white hover:shadow-sm'
                }`}
                data-delay={`${i * 80}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <val.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-sm mb-1.5 ${textPrimary}`}>{val.label}</h4>
                    <p className={`text-xs leading-relaxed ${textMuted}`}>{val.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className={`py-14 border-b ${divider}`}>
          <div className="flex items-center gap-4 mb-10 reveal">
            <div className={`text-2xl font-display font-black ${textPrimary}`}>What Our Students Say</div>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/8' : 'bg-dark-bg/8'}`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`group p-8 flex flex-col justify-between h-full rounded-3xl border transition-all duration-400 hover:-translate-y-1 reveal ${
                  isDark
                    ? 'bg-dark-card border-dark-border hover:border-brand-purple/25 hover:shadow-lg hover:shadow-brand-purple/10'
                    : 'bg-white border-light-border hover:border-brand-purple/25 shadow-sm hover:shadow-lg hover:shadow-brand-purple/10'
                }`}
                data-delay={`${i * 100}`}
              >
                <div>
                  <Quote size={28} className={`mb-4 opacity-20 ${isDark ? 'text-white' : 'text-dark-bg'}`} />
                  <p className={`text-sm md:text-base leading-relaxed mb-6 italic ${textMuted}`}>
                    "{t.quote}"
                  </p>
                </div>
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <h4 className={`font-display font-bold text-sm ${textPrimary}`}>{t.author}</h4>
                  <p className={`text-xs ${textMuted}`}>{t.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className={`pt-10 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 reveal ${divider}`}>
          <div>
            <h3 className={`text-xl font-display font-black mb-1 ${textPrimary}`}>Ready to be part of the ecosystem?</h3>
            <p className={`text-sm ${textMuted}`}>Start your journey or bring your business to the next level.</p>
          </div>
          <div className="flex gap-3">
            <NavLink to="/internships" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all hover:scale-105">
              Launch Your Career
            </NavLink>
            <NavLink to="/contact" className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 border ${isDark ? 'border-white/15 text-white/70 hover:border-white/30 hover:text-white' : 'border-dark-bg/15 text-dark-bg/70 hover:border-dark-bg/30'}`}>
              Contact Us <ArrowUpRight size={13} />
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
}
