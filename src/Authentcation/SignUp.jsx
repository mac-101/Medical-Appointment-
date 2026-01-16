import { useState } from "react";
import FirstPage from "../componentPages/OnBoarding.jsx";
import { PatientLogin } from "../componentPages/LoginsComponents.jsx";

export default function SignupPage() {
  const [startSignup, setStartSignup] = useState(false);
  
  // 1. Add a state to store the selected role
  const [selectedRole, setSelectedRole] = useState(null);

  // 2. Create a handler that catches the role from the child
  const handleUserSelection = (roleFromOnboarding) => {
    setSelectedRole(roleFromOnboarding); // Save "patient", "doctor", or "hospital"
    setStartSignup(true);               // Move to the next screen
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {!startSignup ? (
        // 3. Pass the handler to FirstPage
        <FirstPage onFinalSelection={handleUserSelection} />
      ) : (
        /* 4. Use the role to decide what to show */
        <div>
          {selectedRole === "patient" && <PatientLogin role={selectedRole} />}
          
          {selectedRole === "doctor" && (
            <div className="p-8 bg-white rounded-2xl shadow-xl">
              <h1 className="text-2xl font-bold">Doctor Registration</h1>
              <p>Welcome, Medical Professional. Please enter your credentials.</p>
              {/* You can swap this for a <DoctorLogin /> component later */}
            </div>
          )}

          {selectedRole === "hospital" && (
            <div className="p-8 bg-white rounded-2xl shadow-xl">
              <h1 className="text-2xl font-bold">Hospital Admin</h1>
              <p>Management portal access.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}