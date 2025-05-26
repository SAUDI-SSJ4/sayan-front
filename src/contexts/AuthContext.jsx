import React, { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import AuthGuard from '../components/AuthGuard';

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Higher-order component لحماية الصفحات
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };
};

export default AuthContext; 