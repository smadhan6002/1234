import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type ModalType = 'course' | 'internship' | 'event';

interface RegistrationModalProps {
  type: ModalType;
  itemName: string;
  price?: number;
  eventId?: number;
  onClose: () => void;
}

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

const courseFields: Field[] = [
  { id: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
  { id: 'college_name', label: 'College', type: 'text', placeholder: 'Your college' },
  { id: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Computer Science' },
  { id: 'year', label: 'Year of Study', type: 'select', options: ['1st Year','2nd Year','3rd Year','4th Year','5th Year'] },
  { id: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
];

const internshipFields: Field[] = [
  { id: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
  { id: 'college_name', label: 'College', type: 'text', placeholder: 'Your college' },
  { id: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Computer Science' },
  { id: 'year', label: 'Year of Study', type: 'select', options: ['1st Year','2nd Year','3rd Year','4th Year','5th Year'] },
  { id: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
  {
    id: 'domain',
    label: 'Preferred Domain',
    type: 'select',
    options: [
      'Python Programming',
      'Java Programming',
      'Data Science',
      'Data Analytics',
      'AI & ML',
      'UI/UX Design',
      'Web Development',
      'Full Stack Development',
    ],
  },
];

export default function RegistrationModal({ type, itemName, price = 0, eventId, onClose }: RegistrationModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const fields = type === 'course' ? courseFields : type === 'internship' ? internshipFields : courseFields;
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getInternshipPrice = () => {
    if (type !== 'internship') return 1499;
    const isTraining = itemName.includes('Training');
    const isProject = itemName.includes('Project');
    const is15Days = itemName.includes('15 Days');
    const is1Month = itemName.includes('1 Month');
    const is2Months = itemName.includes('2 Months');
    
    if (isTraining) {
      if (is15Days) return participantType === 'Team of 5' ? 1199 : 299;
      if (is1Month) return participantType === 'Team of 5' ? 1999 : 499;
      if (is2Months) return participantType === 'Team of 5' ? 2499 : 599;
    }
    if (isProject) {
      if (is15Days) return 199;
      if (is1Month) return 299;
      if (is2Months) return 399;
    }
    return 0;
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [participantType, setParticipantType] = useState('');

  const handleSubmit = async () => {
    const missingFields = fields.filter(f => !formData[f.id]);
    if (missingFields.length > 0 || (type === 'internship' && !participantType)) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (type === 'event' && price === 0) {
      setLoading(true);
      setError('');
      try {
        const payload = {
          webinar_name: itemName.replace('Event — ', ''),
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          college_name: formData.college_name,
          department: formData.department,
          year: formData.year,
          registration_date: new Date().toISOString()
        };
        
        const { error: insertError } = await supabase.from('webinar_registrations').insert(payload);
        if (insertError) throw insertError;
        
        if (eventId) {
          const { data: evData } = await supabase.from('events').select('available_seats').eq('id', eventId).single();
          if (evData && evData.available_seats && evData.available_seats > 0) {
            await supabase.from('events').update({ available_seats: evData.available_seats - 1 }).eq('id', eventId);
          }
        }
        
        setSuccess(true);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (type === 'course' && price === 0) {
      setLoading(true);
      setError('');
      try {
        const payload = {
          course_name: itemName,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          college_name: formData.college_name,
          department: formData.department,
          year: formData.year,
          registration_date: new Date().toISOString()
        };
        
        const { error: insertError } = await supabase.from('course_registrations').insert(payload);
        if (insertError) throw insertError;
        
        setSuccess(true);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
      return;
    }

    onClose();
    navigate('/payment', {
      state: {
        type,
        itemName,
        formData,
        participantType,
        price: type === 'internship' ? getInternshipPrice() : price,
        eventId
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className={`relative w-full max-w-lg rounded-2xl border p-6 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={`absolute top-4 right-4 p-1.5 rounded-lg transition-all ${isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-dark-bg/10 text-dark-bg/50 hover:text-dark-bg'}`}>
          <X size={18} />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-400" size={48} />
            </div>
            <h3 className={`text-xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-dark-bg'}`}>
              Registration Successful!
            </h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
              You've registered for <span className="text-brand-purple font-semibold">{itemName}</span>. We'll contact you soon.
            </p>
            <button onClick={onClose} className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-xl text-sm font-semibold">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple mb-3">
                {type === 'course' ? 'Course Registration' : type === 'internship' ? 'Internship Registration' : 'Event Registration'}
              </div>
              <h3 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-dark-bg'}`}>{itemName}</h3>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              {fields.map(field => (
                <div key={field.id}>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
                    {field.label} <span className="text-brand-pink">*</span>
                  </label>
                  {field.type === 'select' ? (
                    <div className="relative">
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === field.id ? null : field.id)} className={`w-full px-4 py-2.5 rounded-xl border text-sm flex items-center justify-between transition-all duration-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 ${isDark ? 'bg-dark-bg border-dark-border text-white' : 'bg-light-muted border-light-border text-dark-bg'}`}>
                        <span>{formData[field.id] || `Select ${field.label}`}</span>
                        <ChevronDown size={18} className={`transition-transform ${openDropdown === field.id ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === field.id && (
                        <div className={`absolute z-20 mt-2 w-full rounded-xl border overflow-hidden shadow-2xl ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
                          {field.options?.map(option => (
                            <button key={option} type="button" onClick={() => { setFormData(d => ({ ...d, [field.id]: option })); setOpenDropdown(null); }} className={`w-full px-4 py-3 text-left text-sm transition-colors ${isDark ? 'hover:bg-brand-purple/20 text-white' : 'hover:bg-brand-purple/10 text-dark-bg'}`}>
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      required
                      {...(field.id === 'phone' ? { maxLength: 10, pattern: '[0-9]{10}', inputMode: 'numeric' } : {})}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={e => setFormData(d => ({ ...d, [field.id]: field.id === 'phone' ? e.target.value.replace(/\D/g, '') : e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 ${isDark ? 'bg-dark-bg border-dark-border text-white placeholder-white/30' : 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/30'}`}
                    />
                  )}
                </div>
              ))}
              
              {type === 'internship' && (
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>Participation Type <span className="text-brand-pink">*</span></label>
                  <select required value={participantType} onChange={(e)=> setParticipantType(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-dark-bg border-dark-border text-white' : 'bg-light-muted border-light-border text-dark-bg'}`}>
                    <option value="">Select</option>
                    <option value="Individual">Individual</option>
                    {itemName.includes('Training') && <option value="Team of 5">Team of 5</option>}
                  </select>
                </div>
              )}
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : (type === 'event' && price === 0 ? 'Complete Registration' : 'Proceed to Payment')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
