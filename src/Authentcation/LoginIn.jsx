import { useState } from "react";
import {Link} from "react-router-dom";
import { Mail, Lock, User, Building, Stethoscope, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full p-8 md:p-12">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-2xl text-white">🏥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HealthCore</h1>
              <p className="text-gray-600 text-sm ">Healthcare Platform</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Choose your role and start your healthcare journey
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              {/* <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div> */}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 8 characters with a number and special character
                </p>
              </div>

              {/* Conditional Fields for Medical Professionals */}
              {/* {role === "doctor" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Medical Center"
                        value={form.organization}
                        onChange={handleChange}
                        className="pl-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Stethoscope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="specialty"
                        placeholder="Cardiology"
                        value={form.specialty}
                        onChange={handleChange}
                        className="pl-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )} */}

              {/* Conditional Fields for Clinical Admin */}
              {/* {role === "admin" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization / Clinic Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="organization"
                      placeholder="Enter clinic or hospital name"
                      value={form.organization}
                      onChange={handleChange}
                      className="pl-10 w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              )} */}
            </div>

            {/* Terms and Conditions */}
            {/* <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mt-0.5"
                required
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
             Sign In
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

            {/* Social Signup */}
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

            {/* Login Link */}
            <p className="text-center text-gray-600 pt-4">
              You Dont Have An Account?{" "}
              <Link to="/signup/patient" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}