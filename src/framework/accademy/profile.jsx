//profile.jsx
import { getData, sendData } from "./production";

export function useProfile() {
  let { data, isLoading, errors } = getData("/profile");
  return { data, isLoading, errors };
}

export function useNotifications() {
  let { data, isLoading, errors } = getData("/notifications");
  return { data, isLoading, errors };
}

export function useLogout(formData) {
  let { data, isLoading, errors } = sendData("/logout", formData);
  return { data, isLoading, errors };
}

export function useUpdateProfile(formData) {
  let { data, isLoading, errors } = sendData("/profile", formData);
  return { data, isLoading, errors };
}

export function useUpdatePassword(formData) {
  let { data, isLoading, errors } = sendData("/password", formData);
  return { data, isLoading, errors };
}
