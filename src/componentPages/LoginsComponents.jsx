import React from 'react';
import { useState } from 'react';




const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // MOCK LOGIN FUNCTION
  const handleMockLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating a network request delay of 1.5 seconds
    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome back! Logging in as: ${email}`);
      console.log("Mock Auth Successful:", { email, password });
      // In a real app, you would route to the Dashboard here
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50 flex flex-col px-8 py-12">
      
      {/* Back Button Placeholder */}
      <button className="text-slate-400 self-start mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Login</h1>
        <p className="text-slate-500 mt-2 text-lg">Enter your details to continue</p>
      </div>

      <form onSubmit={handleMockLogin} className="space-y-6 w-full">
        {/* Email Input */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2 ml-1">Email Address</label>
          <input 
            type="email" 
            placeholder="example@health.com"
            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2 ml-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="text-blue-600 text-sm font-bold mt-3 float-right">
            Forgot Password?
          </button>
        </div>

        {/* Submit Button with Loading State */}
        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 mt-8 rounded-full font-bold text-lg shadow-lg transition-all flex justify-center items-center ${
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

      <p className="text-center mt-auto text-slate-600">
        Don't have an account? <span className="text-blue-600 font-bold cursor-pointer">Register</span>
      </p>
    </div>
  );
};

export { GetStarted, PatientLogin };