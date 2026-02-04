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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
         <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
         </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signUp" state={{ from: location }} replace />;
  }

  // Inject userData into the child component automatically
  if (children) {
    return React.cloneElement(children, { userData });
  }

  return <Element userData={userData} />;
};

export default ProtectedRoute;