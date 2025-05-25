import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Base URL for API
const BASE_URL = "https://www.sayan-server.com";

// Token validation and management utilities
export const AuthUtils = {
  // Get token from cookies
  getToken: () => {
    return Cookies.get('student_token');
  },

  // Remove token and clear session
  clearSession: () => {
    Cookies.remove('student_token');
    localStorage.clear();
    sessionStorage.clear();
  },

  // Check if token exists
  hasToken: () => {
    const token = AuthUtils.getToken();
    return !!token;
  },

  // Validate token with server
  validateToken: async () => {
    const token = AuthUtils.getToken();
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${BASE_URL}/website/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  // Logout user and redirect
  logout: (redirectPath = '/login') => {
    AuthUtils.clearSession();
    toast.error('انتهت صلاحية جلسة العمل. الرجاء تسجيل الدخول مرة أخرى.');
    
    // Redirect to login page
    window.location.href = redirectPath;
  },

  // Check token expiration and handle accordingly
  checkTokenExpiration: async () => {
    if (!AuthUtils.hasToken()) {
      AuthUtils.logout();
      return false;
    }

    const isValid = await AuthUtils.validateToken();
    if (!isValid) {
      AuthUtils.logout();
      return false;
    }

    return true;
  }
};

// API interceptor for automatic token validation
export const apiCall = async (url, options = {}) => {
  const token = AuthUtils.getToken();
  
  if (!token) {
    AuthUtils.logout();
    throw new Error('No authentication token found');
  }

  // Add authorization header
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Check for authentication errors
    if (response.status === 401 || response.status === 403) {
      console.error('Authentication failed:', response.status);
      AuthUtils.logout();
      throw new Error('Authentication failed');
    }

    // Check for other errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      toast.error('خطأ في الاتصال بالشبكة. الرجاء المحاولة مرة أخرى.');
    }
    throw error;
  }
};

// Decode JWT token to check expiration (optional - if your backend uses JWT)
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      // Not a JWT token, we can't check expiration client-side
      return false;
    }

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired if we can't parse
  }
};

export default AuthUtils; 