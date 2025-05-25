import { useEffect, useState, useCallback } from 'react';
import { AuthUtils } from '../utils/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const isValid = await AuthUtils.checkTokenExpiration();
      setIsAuthenticated(isValid);
      
      if (!isValid) {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    AuthUtils.logout();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      console.log('Performing periodic token validation...');
      const isValid = await AuthUtils.checkTokenExpiration();
      if (!isValid) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Listen for storage events (if user logs out in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'student_token' && !e.newValue) {
        // Token was removed in another tab
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for focus events to check auth when user returns to tab
  useEffect(() => {
    const handleFocus = () => {
      if (document.hidden === false) {
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkAuth]);

  return {
    isAuthenticated,
    isLoading,
    user,
    checkAuth,
    logout
  };
};

export default useAuth; 