import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal } from 'react-firebase-hooks/database';
import { auth, db } from '../../firebase.config';
import { ref } from 'firebase/database';

const AuthGate = ({ children }) => {
  const [user, authLoading] = useAuthState(auth);
  const [userData, dbLoading] = useObjectVal(
    user ? ref(db, `users/${user.uid}`) : null
  );

  if (authLoading || dbLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-black text-[10px] tracking-[0.3em] text-slate-400 uppercase">Syncing_Data</p>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="font-black text-[10px] tracking-[0.3em] text-red-500 uppercase">Access_Denied_Login_Required</p>
      </div>
    );
  }

  // We clone the children and pass the userData down as a prop automatically
  return React.cloneElement(children, { userData });
};

export default AuthGate;