// ملف مساعد لتوحيد جميع التنبيهات في المنصة
import toast from "react-hot-toast";

// تنبيه للخطأ بنفس تصميم التنبيه المستخدم في مكون StudentAuthGuard
export const showErrorToast = (message) => {
  return toast.error(message, {
    position: "top-center",
    duration: 3000,
    style: {
      background: "#FEE2E2",
      color: "#DC2626",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    }
  });
};

// تنبيه للنجاح بنفس أسلوب التصميم
export const showSuccessToast = (message) => {
  return toast.success(message, {
    position: "top-center",
    duration: 3000,
    style: {
      background: "#ECFDF5",
      color: "#047857",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    }
  });
};

// تنبيه للمعلومات بنفس أسلوب التصميم
export const showInfoToast = (message) => {
  return toast.success(message, {
    position: "top-center",
    duration: 3000,
    style: {
      background: "#EFF6FF",
      color: "#1D4ED8",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    }
  });
};

// تنبيه للتحذير بنفس أسلوب التصميم
export const showWarningToast = (message) => {
  return toast(message, {
    position: "top-center",
    duration: 3000,
    icon: "⚠️",
    style: {
      background: "#FFFBEB",
      color: "#B45309",
      fontWeight: "bold",
      padding: "16px",
      borderRadius: "8px",
      fontSize: "16px"
    }
  });
};