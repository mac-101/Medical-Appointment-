import React, { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObjectVal } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { auth, db } from '../../firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, authLoading] = useAuthState(auth);
  const [userData, dataLoading] = useObjectVal(
    user ? ref(db, `users/${user.uid}`) : null
  );

  const loading = authLoading || (user && dataLoading);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);