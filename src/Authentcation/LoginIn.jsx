<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Building, Stethoscope, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((fieldName) => {
      const error = validateField(fieldName, form[fieldName]);
      if (error) newErrors[fieldName] = error;
    });
    return newErrors;
  };

  // Check if form is valid
  const isFormValid = () => {
    const formErrors = validateForm();
    return Object.keys(formErrors).length === 0;
  };

  // Handle field change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setLoginError(""); // Clear login error when user starts typing
    
    // Validate field immediately if it's been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, form[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(form).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      setLoginError("");
      
      // Simulate API call with delay
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock validation - in real app, this would be an API call
        const mockUsers = {
          "patient@example.com": { password: "patient123", role: "patient" },
          "doctor@example.com": { password: "doctor123", role: "doctor" },
          "admin@example.com": { password: "admin123", role: "admin" },
        };
        
        const user = mockUsers[form.email];
        
        if (!user) {
          throw new Error("No account found with this email");
        }
        
        if (user.password !== form.password) {
          throw new Error("Incorrect password");
        }
        
        if (user.role !== role) {
          throw new Error(`Please select ${user.role} role to login`);
        }
        
        console.log("Login successful:", { role, ...form, rememberMe });
        
        // Redirect based on role (in real app, you would use navigate)
        const redirectPaths = {
          patient: "/dashboard/patient",
          doctor: "/dashboard/doctor",
          admin: "/dashboard/admin"
        };
        
        // Show success message
        alert(`Login successful! Redirecting to ${role} dashboard...`);
        
        // Reset form
        setForm({
          email: "",
          password: "",
        });
        setTouched({
          email: false,
          password: false,
        });
        
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      setLoginError("Please enter your email address");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      setLoginError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    setLoginError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate password reset email sent
      console.log("Password reset email sent to:", resetEmail);
      setResetSuccess(true);
      
      // Hide reset form after 3 seconds
      setTimeout(() => {
        setShowResetPassword(false);
        setResetSuccess(false);
        setResetEmail("");
      }, 3000);
      
    } catch (error) {
      setLoginError("Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedCredentials = localStorage.getItem("healthcore_credentials");
    if (savedCredentials) {
      try {
        const { email, password, role: savedRole } = JSON.parse(savedCredentials);
        setForm({ email, password });
        setRole(savedRole);
        setRememberMe(true);
      } catch (error) {
        console.error("Error loading saved credentials:", error);
      }
    }
  }, []);

  // Save credentials to localStorage when rememberMe changes
  useEffect(() => {
    if (rememberMe && form.email && form.password) {
      localStorage.setItem("healthcore_credentials", JSON.stringify({
        email: form.email,
        password: form.password,
        role
      }));
    } else if (!rememberMe) {
      localStorage.removeItem("healthcore_credentials");
    }
  }, [rememberMe, form.email, form.password, role]);

  const roles = [
    { id: "patient", label: "Patient", icon: "👤", description: "Find care and manage health" },
    { id: "doctor", label: "Medical Professional", icon: "⚕️", description: "Provide care and consultations" },
    { id: "admin", label: "Clinic Admin", icon: "🏥", description: "Manage clinic operations" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full p-8 md:p-12">
          {/* Password Reset Success Message */}
          {resetSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Reset email sent!</p>
                <p className="text-green-600 text-sm">Check your inbox for password reset instructions.</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-2xl text-white">🏥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HealthCore</h1>
              <p className="text-gray-600 text-sm">Healthcare Platform</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Choose your role and access your healthcare portal
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Select your role:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    role === r.id
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md scale-[1.02]"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl mb-3">{r.icon}</span>
                    <span className="font-semibold text-gray-900 mb-1">{r.label}</span>
                    <span className="text-xs text-gray-500 leading-tight">{r.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Password Reset Form */}
          {showResetPassword ? (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-1">Reset Your Password</h3>
                <p className="text-blue-600 text-sm">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleResetPassword}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700 text-sm">{loginError}</span>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Error Message */}
              {loginError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                    <p className="font-semibold text-red-800">Login Failed</p>
                    <p className="text-red-600 text-sm">{loginError}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${errors.email && touched.email ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email && touched.email
                          ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      required
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${errors.password && touched.password ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 pr-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.password && touched.password
                          ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting || !isFormValid()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-3 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:border-gray-400"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-3 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:border-gray-400"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <span className="font-medium text-gray-700">Facebook</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 pt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          )}
>>>>>>> 85dbde4 (third commit)
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