import React from 'react';
import { Spinner } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ children, fallback = null }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <div>جاري التحقق من المصادقة...</div>
        </div>
      </div>
    );
  }

  // If not authenticated, the useAuth hook will handle logout and redirect
  // This component will not render if user is not authenticated
  if (!isAuthenticated) {
    return fallback || (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="text-danger mb-3">جلسة العمل منتهية الصلاحية</div>
          <div>جاري التوجيه لصفحة تسجيل الدخول...</div>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
};

export default AuthGuard; 