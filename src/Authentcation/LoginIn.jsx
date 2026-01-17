import React, { useState } from 'react';

const LoginPage = ({ onclick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in:", { email, password });
    }, 1500);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="w-full max-w-sm px-4">
        
        {/* Simple Branding */}
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Sign In</h1>
          <p className="text-slate-500 mt-2">Enter your details to access Healthcore OS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0f172a] outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <button type="button" className="text-blue-700 text-xs font-bold hover:underline">Forgot password?</button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0f172a] outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 mt-2 rounded-lg font-bold text-lg transition-all flex justify-center items-center ${
              isLoading
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-[#0f172a] text-white hover:bg-[#1e293b] active:scale-[0.99]"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-sm text-slate-600">
          Don't have an account?{" "}
          <span 
            onClick={onclick} 
            className="text-blue-700 font-bold cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;