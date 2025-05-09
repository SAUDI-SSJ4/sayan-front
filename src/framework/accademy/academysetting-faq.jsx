//slider.jsx
import { deleteData, getData, sendData } from "./production";
export function useAllFAQ(academyId) {
  let { data, isLoading, errors, refresh } = getData(`/faq/${academyId}`);

  return { data, isLoading, errors, refresh };
}
export function useFAQ(id) {
  let { data, isLoading, errors, refresh } = getData(`/faq/show/${id}`);

  return { data, isLoading, errors, refresh };
}

export function useCreateFAQ(formData) {
  let { data, isLoading, errors, postData } = sendData("/faq/create", formData);
  return { data, isLoading, errors, postData };
}

export function useUpdateFAQ(id) {
  let { data, isLoading, errors, postData } = sendData(`/faq/${id}`);
  return { data, isLoading, errors, postData };
}

export function useDeleteFAQ(id) {
  let { data, errors, isLoading } = deleteData(`/faq/${id}`);
  return { data, isLoading, errors };
}
