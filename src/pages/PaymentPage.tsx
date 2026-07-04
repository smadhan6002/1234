import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, Loader2, Calendar, Clock, MapPin, ChevronDown } from 'lucide-react';
import { sendRegistrationMail } from '../lib/email';
import { useTheme } from '../context/ThemeContext';

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

const formFields: Field[] = [
  { id: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
  { id: 'college_name', label: 'College', type: 'text', placeholder: 'Your college' },
  { id: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Computer Science' },
  { id: 'year', label: 'Year of Study', type: 'select', options: ['1st Year','2nd Year','3rd Year','4th Year','5th Year'] },
  { id: 'city', label: 'City', type: 'text', placeholder: 'Your city' },
];

export default function PaymentPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const location = useLocation();
  const { itemName, type, price, eventDetails } = location.state || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingFields = formFields.filter(f => !formData[f.id]);
    if (missingFields.length > 0) {
      alert('Please fill in all details');
      return;
    }
    
    if (!paymentScreenshot) {
      alert('Please upload payment screenshot');
      return;
    }

    setLoading(true);

    try {
      console.log("Uploading to bucket:", "payment-screenshots");
      const fileName = `${Date.now()}-${paymentScreenshot.name.replace(/\s/g, '_')}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, paymentScreenshot);

      if (uploadError) {
        if (uploadError.message?.toLowerCase().includes('bucket not found')) {
          throw new Error("Storage Error: The bucket 'payment-screenshots' does not exist. Please create it in your Supabase dashboard.");
        }
        throw uploadError;
      }

      const screenshotUrl = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(fileName).data.publicUrl;

      let insertError;
      if (type === 'course') {
        const payload = {
          course_name: itemName.replace('Course — ', ''),
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          college_name: formData.college_name,
          department: formData.department,
          year: formData.year,
          payment_screenshot: screenshotUrl,
          registration_date: new Date().toISOString()
        };
        const { error } = await supabase.from('course_registrations').insert(payload);
        insertError = error;
      } else {
        const payload = {
          webinar_name: itemName.replace('Event — ', ''),
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          college_name: formData.college_name,
          department: formData.department,
          year: formData.year,
          payment_screenshot: screenshotUrl,
          registration_date: new Date().toISOString()
        };
        const { error } = await supabase.from('webinar_registrations').insert(payload);
        insertError = error;
      }
      
      if (insertError) throw insertError;
      
      if (eventDetails?.id) {
        const { data: evData } = await supabase.from('events').select('available_seats').eq('id', eventDetails.id).single();
        if (evData && evData.available_seats && evData.available_seats > 0) {
          await supabase.from('events').update({ available_seats: evData.available_seats - 1 }).eq('id', eventDetails.id);
        }
      }

      await sendRegistrationMail({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        college_name: formData.college_name,
        department: formData.department,
        year: formData.year,
        program: itemName,
        type: type,
        participant_type: 'Individual',
        price: price
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      alert(err.message || 'Something went wrong');
    }
  };

  if (success) {
    return (
      <div className={`min-h-[calc(100vh-160px)] flex items-center justify-center p-6 pt-32 ${isDark ? 'bg-dark-bg text-white' : 'bg-light-bg text-dark-bg'}`}>
        <div className={`w-full max-w-lg rounded-3xl border p-10 shadow-xl text-center my-10 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-400" size={56} />
          </div>
          <h3 className="text-3xl font-display font-bold mb-3">Registration Submitted!</h3>
          <p className="text-lg mb-2">
            Hi <span className="font-semibold text-brand-purple">{formData?.full_name}</span> 👋
          </p>
          <p className={`mb-8 leading-relaxed ${isDark ? 'text-white/70' : 'text-dark-bg/70'}`}>
            Your registration and payment proof for <span className="font-semibold text-brand-purple">{itemName}</span> has been received. Our team will verify your payment shortly.
            <br /><br />
            Further details will be shared via email once confirmed.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-brand-purple to-brand-pink transition-all hover:opacity-90 hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 lg:px-12 ${isDark ? 'bg-dark-bg text-white' : 'bg-light-bg text-dark-bg'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-display font-black mb-10 text-center">
          Complete Your <span className="gradient-text">Registration</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Event Details & Payment Info */}
          <div className="space-y-8">
            <div className={`rounded-3xl border p-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'}`}>
              <h2 className="text-2xl font-bold mb-6">Event Details</h2>
              
              {eventDetails && (
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                  {/* Fallback image if event has no image */}
                  <img 
                    src={eventDetails.image || 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                    alt="Event" 
                    className="w-full sm:w-40 h-32 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-brand-purple mb-3">{itemName?.replace('Event — ', '')}</h3>
                    <div className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-dark-bg/70'}`}>
                      <div className="flex items-center gap-2"><Calendar size={16}/> {eventDetails.date}</div>
                      <div className="flex items-center gap-2"><Clock size={16}/> {eventDetails.duration}</div>
                      <div className="flex items-center gap-2"><MapPin size={16}/> {eventDetails.mode}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-dark-bg/10'}`}>
                <p className={`text-sm mb-1 ${isDark ? 'text-white/50' : 'text-dark-bg/50'}`}>Registration Fee</p>
                <p className="text-4xl font-display font-black text-brand-pink">₹{price}</p>
              </div>
            </div>

            <div className={`rounded-3xl border p-8 text-center ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'}`}>
              <h2 className="text-xl font-bold mb-2">Scan & Pay</h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
                Amount to Pay: <span className="font-bold text-lg text-white">₹{price}</span>
              </p>
              <div className="bg-white p-4 rounded-2xl inline-block mb-4">
                <img src="/qr-code.png" alt="QR" className="w-48 h-48 rounded-xl object-cover mx-auto" />
              </div>
              <p className={`text-xs ${isDark ? 'text-white/50' : 'text-dark-bg/50'}`}>
                Scan the QR code with any UPI app to complete the payment.
              </p>
            </div>
          </div>

          {/* Right Column: Form & Screenshot */}
          <div className={`rounded-3xl border p-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border shadow-sm'}`}>
            <h2 className="text-2xl font-bold mb-6">Participant Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {formFields.map(field => (
                <div key={field.id}>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
                    {field.label} <span className="text-brand-pink">*</span>
                  </label>
                  {field.type === 'select' ? (
                    <div className="relative">
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === field.id ? null : field.id)} className={`w-full px-4 py-3 rounded-xl border text-sm flex items-center justify-between transition-all duration-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 ${isDark ? 'bg-dark-bg border-dark-border text-white' : 'bg-light-muted border-light-border text-dark-bg'}`}>
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
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 ${isDark ? 'bg-dark-bg border-dark-border text-white placeholder-white/30' : 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/30'}`}
                    />
                  )}
                </div>
              ))}
              
              <div className="pt-4">
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
                  Payment Screenshot <span className="text-brand-pink">*</span>
                </label>
                <label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-brand-purple/40 rounded-2xl cursor-pointer hover:border-brand-purple transition-all bg-brand-purple/5">
                  <div className="text-3xl mb-2">📸</div>
                  <p className="font-semibold text-sm">Upload Screenshot</p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-dark-bg/50'}`}>PNG, JPG or JPEG</p>
                  {paymentScreenshot && (
                    <p className="mt-3 text-sm text-green-400 font-medium break-all text-center">
                      ✅ {paymentScreenshot.name}
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    required
                    className="hidden"
                    onChange={(e) => setPaymentScreenshot(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center gap-2 disabled:opacity-60 hover:scale-[1.02] transition-transform"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Submitting Registration...</> : 'Submit Registration'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
