import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseManager from '../components/admin/CourseManager';
import EventManager from '../components/admin/EventManager';
import RegistrationManager from '../components/admin/RegistrationManager';
import CourseRegistrationManager from '../components/admin/CourseRegistrationManager';
export default function AdminDashboard() {
const navigate = useNavigate();

const handleLogout = async () => {

await supabase.auth.signOut();

navigate('/');

};
const [activeTab,setActiveTab]=useState('events');

const menu=[

'events',

'courses',

'internships',
'event-registrations',
'course-registrations',
'contacts'

];

return(

<div className="min-h-screen flex">

{/* Sidebar */}

<div className="w-80 border-r p-6">

<div className="mb-10">

<img

src="/Side_transperent.png"

alt="logo"

className="h-14 mb-3"

/>

<p className="text-xs opacity-60">

Administration Panel

</p>

</div>

<div className="space-y-3">

{menu.map(item=>(

<button

key={item}

onClick={()=>

setActiveTab(item)

}

className={`w-full text-left px-4 py-3 rounded-xl capitalize transition-all ${
activeTab===item

?'bg-gradient-to-r from-brand-purple to-brand-pink text-white'

:'hover:bg-white/5'

}`}

>

{item}

</button>

))}

</div>
<button

onClick={handleLogout}

className="w-full mt-10 text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2"

>

<LogOut size={18} />

Logout

</button>

</div>

{/* Content */}

<div className="flex-1 p-10">
{activeTab==='events' && <EventManager />}

{activeTab==='courses' && <CourseManager />}

{activeTab==='internships' && (

<h1 className="text-4xl font-bold">

Manage Internships

</h1>

)}

{activeTab==='event-registrations' && <RegistrationManager />}
{activeTab==='course-registrations' && <CourseRegistrationManager />}

{activeTab==='contacts' && (

<h1 className="text-4xl font-bold">

Contacts

</h1>

)}


</div>

</div>

)

}