import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../services/firebaseAuth"; // Path to your logic file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginUser(email, password);

    setIsLoading(false);

    if (result.success) {
      console.log("Welcome back:", result.user.email);
      navigate('/'); // Send them to the dashboard
    } else {
      // You can get more specific with error handling here
      alert(`Login Failed: ${result.error}`);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white animate-in fade-in duration-500">
      <div className="w-full max-w-sm px-4">
        
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Sign In</h1>
          <p className="text-slate-500 mt-2">Enter your details to access Healthcore OS</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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

        <p className="mt-8 text-sm text-slate-600">
          Don't have an account?{" "}
          <span 
            onClick={handleLogin} 
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