import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { auth, db } from '../../firebase.config';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, element: Element }) => {
  const [user, authLoading] = useAuthState(auth);
  const location = useLocation();

  // Fetch data HERE instead of inside the profile page
  const [userData, dataLoading] = useObjectVal(
    user ? ref(db, `users/${user.uid}`) : null
  );

  // Unified loading: Wait for Auth AND Data
  const isFetching = authLoading || (user && dataLoading) || (user && !userData);

  if (isFetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <Loader2 className="w-12 h-12 text-blue animate-spin mb-4 opacity-80" />
        <p className="font-black text-[10px] uppercase tracking-[0.5em] text-black animate-pulse">
          Syncing_User_Profile
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Inject userData into the child component automatically
  if (children) {
    return React.cloneElement(children, { userData });
  }

  return <Element userData={userData} />;
};

export default ProtectedRoute;