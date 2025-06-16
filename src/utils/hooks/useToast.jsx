import toast from 'react-hot-toast';

// دالة لتصدير دوال التوست مباشرة للاستخدام في المشروع
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    position: "top-center",
    duration: 4000,
    style: {
      background: "#10B981",
      color: "white",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    },
    ...options,
  });
};

export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    position: "top-center",
    duration: 4000,
    style: {
      background: "#EF4444",
      color: "white",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    },
    ...options,
  });
};

export const showInfoToast = (message, options = {}) => {
  toast(message, {
    position: "top-center",
    duration: 4000,
    icon: "ℹ️",
    style: {
      background: "#3B82F6",
      color: "white",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    },
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  toast(message, {
    position: "top-center",
    duration: 4000,
    icon: "⚠️",
    style: {
      background: "#F59E0B",
      color: "white",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    },
    ...options,
  });
};

// Hook الأصلي الذي يستخدم react-hot-toast
export function useToast(defaultOptions = { position: "top-center", duration: 4000 }) {
    const success = (data) =>
        toast.success(data, { 
          ...defaultOptions,
          style: {
            background: "#10B981",
            color: "white",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "16px"
          }
        });

    const error = (data, options) =>
        toast.error(data, { 
          ...defaultOptions, 
          ...options,
          style: {
            background: "#EF4444",
            color: "white",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "16px"
          }
        });

    const info = (data, options) =>
        toast(data, { 
          ...defaultOptions, 
          ...options,
          icon: "ℹ️",
          style: {
            background: "#3B82F6",
            color: "white",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "16px"
          }
        });
    
    const warning = (data, options) =>
        toast(data, { 
          ...defaultOptions, 
          ...options,
          icon: "⚠️",
          style: {
            background: "#F59E0B",
            color: "white",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "16px"
          }
        });

    return { success, error, info, warning };
}