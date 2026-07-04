import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

export default function RegistrationManager() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from('webinar_registrations')
      .select('*')
      .order('registration_date', { ascending: false });

    if (error) {
      showToast(error.message, 'error');
      return;
    }
    setRegistrations(data || []);
  };

  useEffect(() => {
    fetchRegistrations();
    const channel = supabase
      .channel('public:webinar_registrations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'webinar_registrations' }, () => {
        fetchRegistrations();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const confirmUpdate = window.confirm(`Are you sure you want to mark this as ${newStatus}?`);
    if (!confirmUpdate) return;

    const { error } = await supabase
      .from('webinar_registrations')
      .update({ payment_status: newStatus })
      .eq('id', id);

    if (error) {
      showToast(error.message, 'error');
      return;
    }
    showToast(`Status updated to ${newStatus}`, 'success');
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch = 
      r.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.event_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    let statusCategory = 'Pending';
    const pStatus = r.payment_status || 'Pending Verification';
    if (pStatus === 'Free Registration' || pStatus === 'Payment Verified / Registration Confirmed') {
      statusCategory = 'Approved';
    } else if (pStatus.includes('Rejected')) {
      statusCategory = 'Rejected';
    }

    const matchesStatus = filterStatus === 'All' || statusCategory === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold flex items-center gap-2 animate-in slide-in-from-top-2 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Manage Registrations</h1>
      </div>

      <div className="mb-6 p-6 border rounded-3xl bg-[#0D1426] border-[#1A2340] shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#1E2D4A] rounded-xl pl-12 pr-4 py-3 bg-[#050816] text-white placeholder-gray-400 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-inner"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full border border-[#1E2D4A] rounded-xl px-4 py-3 bg-[#050816] text-white outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-inner appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[position:right_16px_center] pr-10"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Verification</option>
            <option value="Approved">Approved / Free</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRegistrations.map((reg: any) => (
          <div
            key={reg.id}
            className="border border-[#1A2340] rounded-3xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-[#0D1426] gap-6 hover:border-[#1E2D4A] transition-colors shadow-sm"
          >
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{reg.full_name}</h3>
                  <p className="text-brand-purple font-semibold text-sm">{reg.event_title}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border ${
                  (reg.payment_status || 'Pending Verification') === 'Free Registration' || (reg.payment_status || 'Pending Verification') === 'Payment Verified / Registration Confirmed'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : (reg.payment_status || 'Pending Verification').includes('Rejected')
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                  {reg.payment_status || 'Pending Verification'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/60 mb-4 bg-[#050816] p-4 rounded-xl border border-[#1A2340]">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Email</span>
                  <span className="truncate block" title={reg.email}>{reg.email}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Phone</span>
                  {reg.phone}
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">College</span>
                  <span className="truncate block" title={reg.college}>{reg.college || '-'}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Date</span>
                  {new Date(reg.registration_date || reg.created_at || Date.now()).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-3 py-1.5 bg-[#1A2340] border border-[#1E2D4A] rounded-lg text-sm font-semibold text-white/80">
                  Amount: <span className={Number(reg.amount_paid) === 0 ? 'text-green-400' : 'text-brand-pink'}>
                    {Number(reg.amount_paid) === 0 ? 'FREE' : `₹${reg.amount_paid}`}
                  </span>
                </span>
                
                {reg.payment_screenshot && (
                  <a
                    href={reg.payment_screenshot}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg"
                  >
                    <ExternalLink size={14} /> View Screenshot
                  </a>
                )}
              </div>
            </div>

            {(reg.payment_status || 'Pending Verification') === 'Pending Verification' && (
              <div className="flex lg:flex-col gap-3 shrink-0 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-[#1A2340] pt-4 lg:pt-0 lg:pl-6">
                <button
                  onClick={() => updateStatus(reg.id, 'Payment Verified / Registration Confirmed')}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-green-500/20 text-green-400 bg-green-500/10 hover:bg-green-500/20 hover:text-green-300 transition-all font-semibold text-sm"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button
                  onClick={() => updateStatus(reg.id, 'Payment Rejected / Please upload the payment screenshot again')}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-all font-semibold text-sm"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
        
        {filteredRegistrations.length === 0 && (
          <div className="col-span-full text-center py-16 border border-[#1A2340] rounded-3xl bg-[#0D1426] text-white/50 shadow-sm">
            No registrations found.
          </div>
        )}
      </div>
    </div>
  );
}
