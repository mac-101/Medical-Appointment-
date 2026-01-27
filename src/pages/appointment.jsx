import React from 'react';
import { useAuth } from '../services/useAuthContext';
import AppointmentsList from '../Data/AppointmentList'; // path to your file
import { Loader2 } from 'lucide-react';

function Appointment() {
  const { userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  // Pass the role from your Firebase userData to the list
  return (
    <AppointmentsList userRole={userData?.role || 'patient'} />
  );
}

export default Appointment;