import React, { useState } from 'react';

const PatientLogin = ({ getUser }) => {
    // Basic fields for everyone
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Role-specific fields
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);

    // Get the role string (patient, doctor, or hospital)
    const selectedRole = getUser;

    // Dynamic Title and Image based on role
    let displayTitle = "Patient Sign Up";
    let bgImage = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200";

    if (selectedRole === 'doctor') {
        displayTitle = "Doctor Registration";
        bgImage = "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200";
    } else if (selectedRole === 'hospital') {
        displayTitle = "Hospital Partnership";
        bgImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200";
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Form Submitted:", { fullName, email, password, location, specialty, role: selectedRole });
            alert(`Account created successfully for ${fullName}!`);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full overflow-hidden bg-white">
            
            {/* LEFT SIDE: Dynamic Image */}
            <div className="hidden lg:block relative w-full h-full">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0 bg-blue-600/10" />
            </div>

            {/* RIGHT SIDE: Dynamic Form */}
            <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-linear-to-b from-white to-blue-50">
                
                <button className="text-slate-400 self-start mb-8 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">{displayTitle}</h1>
                    <p className="text-slate-500 mt-2 text-lg">Create your Healthcare OS account</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4 w-full max-w-md">
                    {/* Common Field: Full Name */}
                    <div>
                        <label className="block text-slate-700 font-semibold mb-1 ml-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-5 py-3 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 outline-none transition-all shadow-sm"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Common Field: Email */}
                    <div>
                        <label className="block text-slate-700 font-semibold mb-1 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-5 py-3 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 outline-none transition-all shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Common Field: Password */}
                    <div>
                        <label className="block text-slate-700 font-semibold mb-1 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-3 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 outline-none transition-all shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* ROLE SPECIFIC: Hospital Location */}
                    {selectedRole === 'hospital' && (
                        <div className="animate-in fade-in slide-in-from-left-2">
                            <label className="block text-slate-700 font-semibold mb-1 ml-1">Hospital Location</label>
                            <input
                                type="text"
                                placeholder="City, Country"
                                className="w-full px-5 py-3 rounded-2xl bg-white border border-blue-200 focus:border-blue-500 outline-none transition-all shadow-sm"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* ROLE SPECIFIC: Doctor Specialty */}
                    {selectedRole === 'doctor' && (
                        <div className="animate-in fade-in slide-in-from-left-2">
                            <label className="block text-slate-700 font-semibold mb-1 ml-1">Specialty</label>
                            <input
                                type="text"
                                placeholder="Cardiology, Pediatrics, etc."
                                className="w-full px-5 py-3 rounded-2xl bg-white border border-blue-200 focus:border-blue-500 outline-none transition-all shadow-sm"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 mt-4 rounded-full font-bold text-lg shadow-xl transition-all flex justify-center items-center ${
                            isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                        }`}
                    >
                        {isLoading ? (
                            <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                <p className="mt-8 text-slate-600">
                    Already have an account? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Log in</span>
                </p>
            </div>
        </div>
    );
};

export { PatientLogin };