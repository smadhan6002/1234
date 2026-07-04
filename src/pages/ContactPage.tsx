import { useEffect, useState } from 'react';
import { Mail, Instagram, Linkedin, MessageCircle, Send, Loader2, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'queries.nextsteplearning@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=queries.nextsteplearning@gmail.com',
    gradient: 'from-brand-purple to-brand-pink',
    desc: 'For courses, services and general inquiries',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@nextstep__learning',
    href: 'https://www.instagram.com/nextstep__learning',
    gradient: 'from-brand-pink to-brand-orange',
    desc: 'Follow us for updates and behind-the-scenes',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'NextStep Learning',
    href: 'https://www.linkedin.com/company/nextstep-learning-official/',
    gradient: 'from-blue-500 to-brand-purple',
    desc: 'Connect with us professionally',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Community',
    value: 'Join the community',
    href: 'https://chat.whatsapp.com/KrxqMd7V0T3GPQKjyzxlc0',
    gradient: 'from-green-500 to-green-400',
    desc: 'Get instant updates and announcements',
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
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useReveal();

const [form, setForm] = useState({
  name: '',
  email: '',
  phone: '',
  message: '',
});  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';
  const textFaint = isDark ? 'text-white/25' : 'text-dark-bg/25';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        created_at: new Date().toISOString(),
      });
      if (dbError) throw dbError;
      setSuccess(true);
      setForm({ name: '', email: '',phone:'', message: ''});
    } catch (err) {
      console.log(err);
      setError('Something went wrong. Please try emailing us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-16 reveal">
          <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
            NextStep Learning — Contact
          </div>
          <h1 className={`text-[clamp(2.3rem,5vw,4.8rem)] font-display font-black leading-none mb-4 ${textPrimary}`}>
            Let's<br />
            <span className="gradient-text">Connect</span>
          </h1>
          <p className={`max-w-md text-base lg:text-lg leading-relaxed ${textMuted}`}>
            Have a question, project or just want to say hello? We're always open.
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-5 border-t pt-12 ${divider}`}>

          {/* ── Contact links ── */}
          <div className="lg:col-span-2 space-y-3 reveal-left">
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                  isDark
                    ? 'bg-dark-card border-dark-border hover:border-brand-purple/25 hover:shadow-brand-purple/8'
                    : 'bg-white border-light-border hover:border-brand-purple/25 shadow-sm hover:shadow-brand-purple/8'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${link.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-semibold tracking-widest uppercase mb-0.5 ${textFaint}`}>{link.label}</p>
                  <p className={`text-sm font-semibold truncate ${textPrimary}`}>{link.value}</p>
                  <p className={`text-[11px] mt-0.5 ${textMuted}`}>{link.desc}</p>
                </div>
                <ArrowUpRight size={14} className={`flex-shrink-0 ${textFaint} group-hover:text-brand-purple transition-colors`} />
              </a>
            ))}
          </div>

          {/* ── Message Form ── */}
          <div className={`lg:col-span-3 rounded-3xl border p-8 lg:p-10 reveal-right ${
            isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'
          }`}>
            <h2 className={`text-xl font-display font-black mb-1 ${textPrimary}`}>Send a Message</h2>
            <p className={`text-sm mb-7 ${textMuted}`}>We typically respond within 24 hours.</p>

            {success ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-2xl bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-400" size={28} />
                </div>
                <h3 className={`text-lg font-display font-black mb-1.5 ${textPrimary}`}>Message Sent!</h3>
                <p className={`text-sm mb-6 ${textMuted}`}>We'll get back to you shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2 rounded-xl bg-brand-purple/10 text-brand-purple text-sm font-semibold hover:bg-brand-purple/20 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${textMuted}`}>
                      Your Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 ${
                        isDark
                          ? 'bg-dark-bg border-dark-border text-white placeholder-white/25'
                          : 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/25'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${textMuted}`}>
                      Email <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 ${
                        isDark
                          ? 'bg-dark-bg border-dark-border text-white placeholder-white/25'
                          : 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/25'
                      }`}
                    />
                  </div>
                </div>

<div>

<label className={`block text-xs font-semibold mb-1.5 ${textMuted}`}>

Phone Number

<span className="text-brand-pink">*</span>

</label>

<input

type="tel"

required

placeholder="+91 XXXXX XXXXX"

maxLength={10}

pattern="[0-9]{10}"

inputMode="numeric"

value={form.phone}

onChange={(e)=>

setForm(f => ({

...f,

phone: e.target.value.replace(/\D/g,'')

}))

}

className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 ${
isDark

? 'bg-dark-bg border-dark-border text-white placeholder-white/25'

: 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/25'

}`}

/>

</div>

                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${textMuted}`}>
                    Message <span className="text-brand-pink">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/15 resize-none ${
                      isDark
                        ? 'bg-dark-bg border-dark-border text-white placeholder-white/25'
                        : 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/25'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
