import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {

const navigate = useNavigate();

const [email,setEmail]=useState('');

const [password,setPassword]=useState('');

const handleLogin=async()=>{
if(email === 'akshayahemraj28@gmail.com' && password === 'akshaya*2804'){
  navigate('/dashboard');
} else {
  alert('Invalid credentials');
}
}

return(

<div className="min-h-screen flex items-center justify-center p-6">

<div className="w-full max-w-md rounded-3xl border p-8">

<h1 className="text-3xl font-bold mb-8 text-center">

Admin Login

</h1>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full border rounded-xl px-4 py-3 mb-4 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none"
/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="w-full border rounded-xl px-4 py-3 mb-6 bg-white text-dark-bg border-light-border placeholder:text-dark-bg/50 outline-none"
/>

<button

onClick={handleLogin}

className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-brand-purple to-brand-pink"

>

Login

</button>

</div>

</div>

)

}