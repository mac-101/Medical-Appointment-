// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Mail, Lock, User, Building, Stethoscope, Eye, EyeOff } from 'lucide-react';
import FirstPage from "../componentPages/OnBoarding.jsx";
// import {PatientLogin} from "../componentPages/LoginsComponents.jsx";

export default function SignupPage() {
  // const [role, setRole] = useState("patient");
  // const [showPassword, setShowPassword] = useState(false);
  // const [form, setForm] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   organization: "",
  //   specialty: "",
  // });



  const roles = [
    { id: "patient", label: "Patient", icon: "👤", description: "Find care and manage health" },
    { id: "doctor", label: "Medical Professional", icon: "⚕️", description: "Provide care and consultations" },
    { id: "admin", label: "Clinic Admin", icon: "🏥", description: "Manage clinic operations" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <FirstPage />
    </div>
  );
}


