import React, { useState } from 'react';

const PatientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleMockLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`Welcome back! Logging in as: ${email}`);
        }, 1500);
    };

    return (
        /* grid-cols-1 for mobile, lg:grid-cols-2 for desktop */
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full overflow-hidden bg-white">
            
            {/* LEFT SIDE: Image (Hidden on small screens, shown on large) */}
            <div className="hidden lg:block relative w-full h-full">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop)` }}
                />
                {/* Optional: A blue tint overlay to match your branding */}
                <div className="absolute inset-0 bg-blue-600/10" />
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 bg-linear-to-b from-white to-blue-50">
                
                {/* Back Button */}
                <button className="text-slate-400 self-start mb-8 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Login</h1>
                    <p className="text-slate-500 mt-2 text-lg">Enter your details to access Healthcare OS</p>
                </div>

                <form onSubmit={handleMockLogin} className="space-y-6 w-full max-w-md">
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 font-semibold mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="text-blue-600 text-sm font-bold mt-3 float-right hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 mt-8 rounded-full font-bold text-lg shadow-xl shadow-blue-500/20 transition-all flex justify-center items-center ${
                            isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                        }`}
                    >
                        {isLoading ? (
                            <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p className="mt-12 text-slate-600">
                    Don't have an account? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Register now</span>
                </p>
            </div>
        </div>
    );
};

export { PatientLogin };