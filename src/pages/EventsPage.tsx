import { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import RegistrationModal from '../components/RegistrationModal';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
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

export default function EventsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  useReveal();

  const [events, setEvents] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.log(error);
      return;
    }
    setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();

    const channel = supabase
      .channel('public:events')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        () => {
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter and sort Upcoming Events (nearest date first)
  const upcomingEvents = events.filter((e) => new Date(e.date) >= today);
  upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filter and sort Past Events (most recent first)
  const pastEvents = events.filter((e) => new Date(e.date) < today);
  pastEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {modal && (
        <RegistrationModal
          type="event"
          itemName={modal.name}
          price={modal.price}
          onClose={() => setModal(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${isDark ? 'text-white/25' : 'text-dark-bg/25'}`}>
            NextStep Learning — Events
          </div>
          <h1 className={`text-[clamp(2.3rem,5vw,4.8rem)] font-display font-black leading-none mb-4 ${textPrimary}`}>
            Beyond Courses.<br />
            <span className="gradient-text">Experience Learning.</span>
          </h1>
          <p className={`max-w-lg text-base lg:text-lg leading-relaxed ${textMuted}`}>
            Webinars and bootcamps designed to help you learn faster, build confidence and stay industry-ready.
          </p>
        </div>

        {/* Webinar Banner */}
        <SectionBanner
          isDark={isDark}
          textPrimary={textPrimary}
          textMuted={textMuted}
          title="Industry Webinars"
          subtitle="Interactive live sessions designed to expose students to industry trends, emerging technologies, career opportunities and real-world insights directly from experienced professionals and domain experts."
          image="https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=900"
          gradient="from-brand-purple to-brand-pink"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {upcomingEvents
            .filter((event: any) => event.category === 'Webinar')
            .map((event: any) => (
              <EventCard
                key={event.id}
                event={event}
                textPrimary={textPrimary}
                textMuted={textMuted}
                setModal={setModal} navigate={navigate}
              />
            ))}
        </div>

        {/* Bootcamp Banner */}
        <SectionBanner
          isDark={isDark}
          textPrimary={textPrimary}
          textMuted={textMuted}
          title="Hands-on Bootcamps & Workshops"
          subtitle="Intensive practical sessions focused on hands-on learning, collaboration, problem-solving and project development to strengthen technical and industry-ready skills."
          image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=900"
          gradient="from-brand-pink to-brand-orange"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {upcomingEvents
            .filter((event: any) => event.category === 'Bootcamp & Workshop' || event.category === 'Internship')
            .map((event: any) => (
              <EventCard
                key={event.id}
                event={event}
                textPrimary={textPrimary}
                textMuted={textMuted}
                setModal={setModal} navigate={navigate}
              />
            ))}
        </div>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div className="mt-24">
            <h2 className={`text-3xl font-display font-black mb-8 ${textPrimary}`}>Past Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastEvents.map((event: any) => (
                <EventCard
                  key={event.id}
                  event={event}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  setModal={setModal} navigate={navigate}
                  isPast={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionBanner({ isDark, title, subtitle, image, gradient, textPrimary, textMuted }: any) {
  return (
    <div className={`rounded-3xl border overflow-hidden mb-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-2/5 h-52 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`} />
        </div>
        <div className="lg:w-3/5 p-8 flex flex-col justify-center">
          <h2 className={`text-3xl font-display font-black mb-3 ${textPrimary}`}>{title}</h2>
          <p className={`text-sm ${textMuted}`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, textPrimary, textMuted, setModal, navigate, isPast }: any) {
  return (
    <div className="rounded-3xl border p-7">
      <h3 className={`text-2xl font-display font-black mb-4 ${textPrimary}`}>
        {event.title}
      </h3>
      <p className={`text-sm mb-6 ${textMuted}`}>{event.description}</p>
      
      <div className={`flex flex-wrap gap-5 text-xs mb-6 ${textMuted}`}>
        <div><Clock size={12} className="inline mr-1" />{event.duration}</div>
        <div><Calendar size={12} className="inline mr-1" />{event.date}</div>
        <div>💻 {event.mode}</div>
        <div>{Number(event.price) === 0 ? 'FREE' : `₹${event.price}`}</div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {(Array.isArray(event.highlights)
          ? event.highlights
          : String(event.highlights || '').split(',')
        ).map((h: string) => (
          <li key={h} className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-brand-purple" />
            <span className={`text-xs ${textMuted}`}>{h.trim()}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => {
          if (!isPast && event.status === 'Open') {
            const price = Number(event.price);
            if (price > 0) {
              navigate('/payment', {
                state: {
                  type: 'event',
                  itemName: `Event — ${event.title}`,
                  price: price,
                  eventDetails: event
                }
              });
            } else {
              setModal({ name: `Event — ${event.title}`, price: 0, eventId: event.id });
            }
          }
        }}
        disabled={isPast || event.status !== 'Open'}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
          !isPast && event.status === 'Open'
            ? 'bg-gradient-to-r from-brand-pink to-brand-orange text-white'
            : 'bg-brand-purple/10 text-brand-purple border border-brand-purple cursor-not-allowed'
        }`}
      >
        {isPast ? 'Event Concluded' : event.status === 'Open' ? 'Register' : 'Registration Closed'}
        {!isPast && event.status === 'Open' && <ArrowUpRight size={12} />}
      </button>
    </div>
  );
}
