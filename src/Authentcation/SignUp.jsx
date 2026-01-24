// <<<<<<< HEAD
import { useState, useEffect } from "react";
// import { useState } from "react";
import { PatientLogin } from "../componentPages/LoginsComponents.jsx";
// =======
import { Link } from "react-router-dom";
import { Mail, Lock, User, Building, Stethoscope, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
// >>>>>>> 85dbde4 (third commit)

// --- COMPONENT 1: GET STARTED (PLAIN) ---
const GetStarted = ({ onContinue, onLogin }) => {
  return (
    <div className="relative h-screen w-full bg-white flex flex-col items-center justify-between py-16 px-8 transition-all">
      <div className="flex flex-col items-center mt-10 text-center">
        {/* Minimal Logo Space */}
        <div className="w-16 h-16 mb-6 flex items-center justify-center bg-slate-900 rounded-2xl text-white">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Healthcore OS</h1>
        <p className="text-slate-500 font-medium mt-1 uppercase tracking-[0.2em] text-[10px]">Inspiring Health Everyday</p>
      </div>

{/* <<<<<<< HEAD */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Stay healthy and fit</h2>
        <p className="text-slate-500 mt-2">Let's get started with your account</p>
      </div>

      <div className="w-full max-w-sm space-y-3 mb-10">
        <button onClick={onLogin} className="w-full py-4 bg-slate-900 text-white font-semibold text-lg rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all">
          Sign In
        </button>
        <button onClick={onContinue} className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-semibold text-lg rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all">
          Create Account
        </button>
      </div>
      <p className="absolute bottom-6 text-slate-400 text-[10px] font-medium uppercase tracking-widest">© Ayon Bepary Design</p>
    </div>
  );
};

// --- COMPONENT 2: ROLE SELECTION (PLAIN) ---
const RoleSelection = ({ onRoleSelected }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
// =======
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    organization: "",
    specialty: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    organization: false,
    specialty: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation rules
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          error = "Full name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/(?=.*[0-9])/.test(value)) {
          error = "Password must contain at least one number";
        } else if (!/(?=.*[!@#$%^&*])/.test(value)) {
          error = "Password must contain at least one special character";
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        }
        break;

      case "organization":
        if (role === "admin" && !value.trim()) {
          error = "Organization name is required for clinic admins";
        } else if (value && value.trim().length < 2) {
          error = "Organization name must be at least 2 characters";
        }
        break;

      case "specialty":
        if (role === "doctor" && value && value.trim().length < 2) {
          error = "Specialty must be at least 2 characters";
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
// >>>>>>> 85dbde4 (third commit)

  // Check if form is valid
  const isFormValid = () => {
    const formErrors = validateForm();
    return Object.keys(formErrors).length === 0;
  };

  // Handle field change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
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

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "gray" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/(?=.*[0-9])/.test(password)) score++;
    if (/(?=.*[!@#$%^&*])/.test(password)) score++;
    if (/(?=.*[A-Z])/.test(password)) score++;
    
    const strengths = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-green-500" }
    ];
    
    return strengths[score];
  };

  // Handle form submission
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
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted:", { role, ...form });
        
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        
        // Reset form
        setForm({
          fullName: "",
          email: "",
          password: "",
          organization: "",
          specialty: "",
        });
        setTouched({
          fullName: false,
          email: false,
          password: false,
          organization: false,
          specialty: false,
        });
        
      } catch (error) {
        console.error("Submission error:", error);
        setErrors(prev => ({ ...prev, submit: "Failed to create account. Please try again." }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Update validation when role changes
  useEffect(() => {
    const formErrors = validateForm();
    setErrors(formErrors);
  }, [role]);

  const roles = [
    { id: 'patient', title: 'Patient', desc: 'I want to book an appointment' },
    { id: 'doctor', title: 'Doctor', desc: 'I want to manage my patients' },
    { id: 'hospital', title: 'Hospital', desc: 'Management & Administration' },
  ];

// <<<<<<< HEAD
  const handleRoleSubmit = () => {
    if (!selectedRole) return alert("Please select a role first!");
    setIsProcessing(true);
    setTimeout(() => {
      onRoleSelected(selectedRole);
      setIsProcessing(false);
    }, 500);
  };

//   return (
//     <div className="min-h-screen w-full bg-white flex flex-col items-center py-16 px-8">
//       <div className='relative max-w-md mx-auto min-h-[70vh] w-full flex flex-col'>
//         <div className="mb-12 text-left">
//           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Select Role</h1>
//           <p className="text-slate-500 mt-2">Choose how you will use the platform</p>
// {/* ======= */}
//   // Password requirements checklist
//   const passwordRequirements = [
//     { label: "At least 8 characters", met: (pwd) => pwd.length >= 8 },
//     { label: "Contains a number", met: (pwd) => /(?=.*[0-9])/.test(pwd) },
//     { label: "Contains a special character", met: (pwd) => /(?=.*[!@#$%^&*])/.test(pwd) },
//     { label: "Contains an uppercase letter", met: (pwd) => /(?=.*[A-Z])/.test(pwd) },
//   ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full p-8 md:p-12">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Account created successfully!</p>
                <p className="text-green-600 text-sm">Welcome to HealthCore. You can now log in.</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${errors.fullName && touched.fullName ? 'text-red-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.fullName && touched.fullName
                        ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                    }`}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <div className="flex items-center mt-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.fullName}
                  </div>
                )}
              </div>

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
                
                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        getPasswordStrength(form.password).color === 'bg-green-500' ? 'text-green-600' :
                        getPasswordStrength(form.password).color === 'bg-blue-500' ? 'text-blue-600' :
                        getPasswordStrength(form.password).color === 'bg-yellow-500' ? 'text-yellow-600' :
                        getPasswordStrength(form.password).color === 'bg-orange-500' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {getPasswordStrength(form.password).label}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrength(form.password).color} transition-all duration-300`}
                        style={{ width: `${(getPasswordStrength(form.password).score / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                        req.met(form.password) ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {req.met(form.password) ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                      <span className={`text-xs ${
                        req.met(form.password) ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>

                {errors.password && touched.password && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Conditional Fields for Medical Professionals */}
              {role === "doctor" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className={`h-5 w-5 ${errors.organization && touched.organization ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Medical Center (Optional)"
                        value={form.organization}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.organization && touched.organization
                            ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                        }`}
                      />
                    </div>
                    {errors.organization && touched.organization && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.organization}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Stethoscope className={`h-5 w-5 ${errors.specialty && touched.specialty ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="text"
                        name="specialty"
                        placeholder="Cardiology (Optional)"
                        value={form.specialty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.specialty && touched.specialty
                            ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                        }`}
                      />
                    </div>
                    {errors.specialty && touched.specialty && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.specialty}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Conditional Fields for Clinical Admin */}
              {role === "admin" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization / Clinic Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className={`h-5 w-5 ${errors.organization && touched.organization ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      name="organization"
                      placeholder="Enter clinic or hospital name"
                      value={form.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.organization && touched.organization
                          ? 'border-red-300 focus:ring-red-500 focus:border-transparent'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      required={role === "admin"}
                    />
                  </div>
                  {errors.organization && touched.organization && (
                    <div className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.organization}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
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
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
{/* >>>>>>> 85dbde4 (third commit) */}
        </div>

        <div className="space-y-3 flex-1">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full p-5 rounded-xl transition-all flex items-center space-x-4 text-left border ${
                selectedRole === role.id
                  ? "border-slate-900 bg-slate-50"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedRole === role.id ? "border-slate-900" : "border-slate-300"
              }`}>
                {selectedRole === role.id && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 leading-none">{role.title}</h3>
                <p className="text-slate-500 text-sm mt-1.5">{role.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleRoleSubmit}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-8 ${
            selectedRole ? "bg-slate-900 text-white active:scale-[0.98]" : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isProcessing ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStep, setCurrentStep] = useState('getStarted'); 

  const handleStart = () => setCurrentStep('selectRole');
  const onLogin = () => setCurrentStep('login');
  const handleRoleChoice = (role) => {
    setSelectedRole(role);
    setCurrentStep('finalForm');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {currentStep === 'getStarted' && (
        <GetStarted onContinue={handleStart} onLogin={onLogin} />
      )}

      {currentStep === 'selectRole' && (
        <RoleSelection onRoleSelected={handleRoleChoice} />
      )}

      {currentStep === 'finalForm' && (
        <PatientLogin getUser={selectedRole} loggingIn={false} pickRole={handleStart} />
      )}

      {currentStep === 'login' && (
        <PatientLogin getUser={selectedRole} loggingIn={true} pickRole={handleStart} />
      )}
    </div>
  );
}