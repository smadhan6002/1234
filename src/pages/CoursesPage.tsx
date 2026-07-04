import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
Calendar,
Clock,
ArrowUpRight,
CheckCircle2
} from 'lucide-react';

import { useTheme } from '../context/ThemeContext';
import RegistrationModal from '../components/RegistrationModal';
import { supabase } from '../lib/supabase';

function useReveal() {

useEffect(() => {

const els = document.querySelectorAll(

'.reveal,.reveal-left,.reveal-right'

);

const io = new IntersectionObserver(

entries => {

entries.forEach(e => {

if (e.isIntersecting) {

const el = e.target as HTMLElement;

setTimeout(

() => el.classList.add('visible'),

Number(el.dataset.delay || 0)

);

io.unobserve(el);

}

});

},

{

threshold:0.08

}

);

els.forEach(el => io.observe(el));

return ()=>io.disconnect();

},[]);

}

export default function CoursesPage(){

const { theme } = useTheme();

const isDark = theme === 'dark';

useReveal();

const navigate = useNavigate();
const [courses,setCourses]=useState<any[]>([]);

const [modal,setModal]=useState<any>(null);

useEffect(()=>{

fetchCourses();

},[]);

const fetchCourses = async()=>{

const { data,error } = await supabase

.from('courses')

.select('*')

.order('created_at',{

ascending:false

});

if(error){

console.log(error);

return;

}

setCourses(data || []);

}

const textPrimary =

isDark

? 'text-white'

: 'text-dark-bg';

const textMuted =

isDark

? 'text-white/50'

: 'text-dark-bg/50';

return(

<div

className={`min-h-screen pt-32 pb-24 ${
isDark

? 'bg-dark-bg'

: 'bg-light-bg'
}`}

>

{modal && (

<RegistrationModal

type="course"

itemName={modal.name}

price={modal.price}

onClose={()=>setModal(null)}

/>

)}

<div className="max-w-7xl mx-auto px-6 lg:px-12">

{/* Header */}

<div className="mb-16 reveal">

<div

className={`text-xs font-semibold tracking-widest uppercase mb-4 ${
isDark

? 'text-white/25'

: 'text-dark-bg/25'
}`}

>

NextStep Learning — Courses

</div>

<h1

className={`text-[clamp(2.3rem,5vw,4.8rem)] font-display font-black leading-none mb-4 ${textPrimary}`}

>

Build Skills That

<br/>

<span className="gradient-text">

Actually Matter

</span>

</h1>

<p

className={`max-w-lg text-base lg:text-lg leading-relaxed ${textMuted}`}

>

Industry-aligned programs built around doing, not just watching.

</p>

</div>

{/* Banner */}

<div

className={`rounded-3xl border overflow-hidden mb-10 ${
isDark

?'bg-dark-card border-dark-border'

:'bg-white border-light-border'
}`}

>

<div className="flex flex-col lg:flex-row">

<div className="relative lg:w-2/5 h-52 overflow-hidden">

<img

src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=900"

alt="Courses"

className="w-full h-full object-cover"

/>

<div

className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-pink opacity-60"

/>

</div>

<div className="lg:w-3/5 p-8 flex flex-col justify-center">

<h2

className={`text-3xl font-display font-black mb-3 ${textPrimary}`}

>

Industry Courses

</h2>

<p

className={`text-sm leading-8 ${textMuted}`}

>

Structured learning programs designed to help students build strong foundations, gain practical skills and become industry-ready through guided learning experiences.

</p>

</div>

</div>

</div>

{/* Course Cards */}

<div className="grid md:grid-cols-2 gap-6">

{courses.map((course:any)=>(

<div

key={course.id}

className={`rounded-3xl overflow-hidden border ${
isDark

?'bg-dark-card border-dark-border'

:'bg-white border-light-border'
}`}

>

{/* Image */}

<div className="relative h-48 overflow-hidden">

<img

src={

course.image ||

'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'

}

alt={course.title}

className="w-full h-full object-cover"

/>

<div

className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-pink opacity-40"

/>

</div>

<div className="p-7">

<h3

className={`text-2xl font-display font-black mb-4 ${textPrimary}`}

>

{course.title}

</h3>

<p

className={`text-sm mb-6 ${textMuted}`}

>

{course.description}

</p>

<div

className={`flex flex-wrap gap-5 text-xs mb-6 ${textMuted}`}

>

<div>

<Clock

size={12}

className="inline mr-1"

/>

{course.duration}

</div>

<div>

<Calendar

size={12}

className="inline mr-1"

/>

{course.date}

</div>

<div>

💻 {course.mode}

</div>

<div>

{

Number(course.price)===0

? 'FREE'

: `₹${course.price}`

}

</div>

</div>

<ul className="space-y-2 mb-6">

{(

Array.isArray(course.highlights)

? course.highlights

: String(course.highlights || '')

.split(',')

)

.map((h:string)=>(

<li

key={h}

className="flex items-center gap-2"

>

<CheckCircle2

size={13}

className="text-brand-purple"

/>

<span

className={`text-xs ${textMuted}`}

>

{h.trim()}

</span>

</li>

))}

</ul>

<button

onClick={() => {
if(course.status==='Open'){
  const price = Number(course.price);
  if (price > 0) {
    navigate('/payment', {
      state: {
        type: 'course',
        itemName: course.title,
        price: price,
        eventDetails: course
      }
    });
  } else {
    setModal({
      name: course.title,
      price: 0,
      courseId: course.id
    });
  }
}
}}

disabled={course.status!=='Open'}

className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
course.status==='Open'

? 'bg-gradient-to-r from-brand-pink to-brand-orange text-white'

: course.status==='Coming Soon'

? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white cursor-not-allowed'

: 'bg-brand-purple/10 text-brand-purple border border-brand-purple cursor-not-allowed'
}`}

>

{course.status==='Open'

?'Register'

:course.status==='Coming Soon'

?'Coming Soon'

:'Registration Closed'}

{course.status==='Open' &&

<ArrowUpRight size={12} />

}

</button>

</div>

</div>

))}

</div>

</div>

</div>

)

}