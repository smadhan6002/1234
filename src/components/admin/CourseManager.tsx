import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Edit2, Trash2, Eye } from 'lucide-react';

export default function CourseManager() {
  const inputStyle = 'w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-white text-gray-900 placeholder-gray-500 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-sm';
  const selectStyle = 'w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-white text-gray-900 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-sm appearance-none bg-no-repeat bg-[url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")] bg-[length:12px_12px] bg-[position:right_16px_center] pr-10';

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [mode, setMode] = useState('Online');
  const [status, setStatus] = useState('Open');
  const [image, setImage] = useState('');
  const [highlights, setHighlights] = useState('');

  const [courses, setCourses] = useState<any[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (error) {
      showToast(error.message, 'error');
      return;
    }
    setCourses(data || []);
  };

  useEffect(() => {
    fetchCourses();
    const channel = supabase
      .channel('public:courses')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
        fetchCourses();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSave = async () => {
    if (status !== 'Coming Soon' && !date) {
      showToast('Please select a date', 'error');
      return;
    }

    if (!title.trim() || !duration || price === '' || !mode || !status) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const payload = {
      title,
      description,
      date,
      duration,
      price: Number(price),
      mode,
      status,
      image,
      highlights,
    };

    if (editingId) {
      const { error } = await supabase.from('courses').update(payload).eq('id', editingId);
      if (error) {
        showToast(error.message, 'error');
        return;
      }
      showToast('Course updated successfully', 'success');
    } else {
      const { error } = await supabase.from('courses').insert(payload);
      if (error) {
        showToast(error.message, 'error');
        return;
      }
      showToast('Course created successfully', 'success');
    }
    resetForm();
  };

  const handleEdit = (course: any) => {
    setEditingId(course.id);
    setTitle(course.title || '');
    setDescription(course.description || '');
    setDate(course.date || '');
    setDuration(course.duration || '');
    setPrice(course.price?.toString() || '');
    setMode(course.mode || 'Online');
    setStatus(course.status || 'Open');
    setImage(course.image || '');
    setHighlights(Array.isArray(course.highlights) ? course.highlights.join(', ') : course.highlights || '');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) {
      showToast(error.message, 'error');
      return;
    }
    showToast('Course deleted successfully', 'success');
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setDuration('');
    setPrice('');
    setImage('');
    setHighlights('');
    setMode('Online');
    setStatus('Open');
    setShowForm(false);
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
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
        <h1 className="text-4xl font-bold">Manage Courses</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-5 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-[#050816]"
        >
          + Add Course
        </button>
      </div>

      {showForm && (
        <div className="max-w-3xl border rounded-3xl p-8 mb-8 bg-white text-gray-900 shadow-xl border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? 'Edit Course' : 'Add Course'}</h2>
          
          <input placeholder="Course Title *" value={title} onChange={(e) => setTitle(e.target.value)} className={inputStyle} />
          <textarea placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)} className={inputStyle} rows={3} />
          
          <div className="grid md:grid-cols-2 gap-4">
            <input type="date" value={date} disabled={status === 'Coming Soon'} required={status !== 'Coming Soon'} onChange={(e) => setDate(e.target.value)} className={inputStyle} />
            <input placeholder="Duration *" value={duration} onChange={(e) => setDuration(e.target.value)} className={inputStyle} />
          </div>
          
          <div className="mb-4">
            <input type="number" min="0" step="1" onKeyDown={(e) => { if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault(); }} placeholder="Price (0 for Free) *" value={price} onChange={(e) => setPrice(e.target.value)} className={inputStyle} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectStyle}>
              <option value="Open">Open Registration</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Registration Closed">Registration Closed</option>
            </select>
            <input placeholder="Image URL *" value={image} onChange={(e) => setImage(e.target.value)} className={inputStyle} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select value={mode} onChange={(e) => setMode(e.target.value)} className={selectStyle}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <textarea placeholder="Highlights (Separate using commas)" value={highlights} onChange={(e) => setHighlights(e.target.value)} className={inputStyle} rows={2} />
          </div>
          
          <div className="flex gap-4">
            <button onClick={handleSave} className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink flex-1 font-bold shadow-md hover:opacity-90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2">
              {editingId ? 'Update Course' : 'Save Course'}
            </button>
            <button onClick={resetForm} className="px-6 py-3 rounded-xl text-gray-700 border border-gray-300 bg-white flex-1 font-bold hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-6 p-6 border rounded-3xl bg-[#0D1426] border-[#1A2340] shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
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
            <option value="Open">Open Registration</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Registration Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course: any) => (
          <div
            key={course.id}
            className="border border-[#1A2340] rounded-3xl flex flex-col bg-[#0D1426] hover:border-[#1E2D4A] transition-colors shadow-sm overflow-hidden"
          >
            {/* Image on top */}
            <div className="relative h-48 bg-[#050816]">
              <img
                src={course.image || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            
            {/* Content below */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              <p className="text-sm text-white/60 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 text-sm text-white/70 mb-4">
                {course.category && (
                  <span className="px-2.5 py-1 bg-[#1A2340] border border-[#1E2D4A] rounded-lg font-medium">
                    {course.category}
                  </span>
                )}
                {course.duration && (
                  <span className="px-2.5 py-1 bg-[#1A2340] border border-[#1E2D4A] rounded-lg">
                    {course.duration}
                  </span>
                )}
                {course.mode && (
                  <span className="px-2.5 py-1 bg-[#1A2340] border border-[#1E2D4A] rounded-lg">
                    {course.mode}
                  </span>
                )}
                <span className="px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg font-semibold">
                  {Number(course.price) === 0 ? 'Free' : `?${course.price}`}
                </span>
                <span className={`px-2.5 py-1 rounded-lg font-medium border ${course.status === 'Open' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : course.status === 'Coming Soon' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {course.status}
                </span>
              </div>
              
              <div className="mt-auto pt-4 flex gap-3 justify-end border-t border-[#1A2340]">
                <a
                  href="/courses"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-[#1A2340] text-white/60 hover:text-white hover:bg-[#1E2D4A] transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
                  title="Preview"
                >
                  <Eye size={18} />
                </a>
                <button
                  onClick={() => handleEdit(course)}
                  className="p-3 rounded-xl border border-[#1A2340] text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-3 rounded-xl border border-red-500/20 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredCourses.length === 0 && (
          <div className="col-span-full text-center py-16 border border-[#1A2340] rounded-3xl bg-[#0D1426] text-white/50 shadow-sm">
            No courses found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
