import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Building, Stethoscope, Eye, EyeOff } from 'lucide-react';
import OnBoarding from "../componentPages/OnBoarding.jsx";

export default function SignupPage() {
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    organization: "",
    specialty: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, ...form });
  };

  const roles = [
    { id: "patient", label: "Patient", icon: "👤", description: "Find care and manage health" },
    { id: "doctor", label: "Medical Professional", icon: "⚕️", description: "Provide care and consultations" },
    { id: "admin", label: "Clinic Admin", icon: "🏥", description: "Manage clinic operations" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <OnBoarding/>
      
    </div>
  );
}

<div class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-100 to-blue-400 font-sans">
  
  <div class="absolute top-20 flex h-64 w-64 items-center justify-center rounded-full bg-blue-500 shadow-inner">
    <img 
      src="https://images.unsplash.com/photo-1559839734-2b71f1e3585e?auto=format&fit=crop&q=80&w=1000" 
      alt="Doctor Specialist" 
      class="h-full w-full rounded-full object-cover border-4 border-white/20"
    />
  </div>

  <div class="mt-48 px-8 text-center">
    <div class="mb-6 flex justify-center space-x-1">
      <div class="h-1 w-8 rounded-full bg-blue-700"></div>
      <div class="h-1 w-4 rounded-full bg-blue-200"></div>
    </div>

    <h1 class="text-3xl font-bold leading-tight text-slate-800">
      Find a Lot of Specialist <br /> Doctors in One Place
    </h1>
  </div>

</div>