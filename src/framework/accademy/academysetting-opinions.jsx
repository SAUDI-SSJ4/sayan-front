//slider.jsx
import { deleteData, getData, sendData } from "./production";
export function useAllOpinions(id) {
  let { data, isLoading, errors, refresh } = getData(`/opinions/${id}`);

  return { data, isLoading, errors, refresh };
}

export function useOpinion(id) {
  let { data, isLoading, errors } = getData(`/opinion/show/${id}`);
  return { data, isLoading, errors };
}

export function useCreateOpinion(formData) {
  let { data, isLoading, errors, postData } = sendData("/opinions", formData);
  return { data, isLoading, errors, postData };
}

export function useUpdateOpinion(id) {
  let { data, isLoading, errors, postData } = sendData(`/opinions/${id}`);
  return { data, isLoading, errors, postData };
}

export function useDeleteOpinion(id) {
  let { data, isLoading, errors } = deleteData(`/opinions/${id}`);
  return { data, isLoading, errors };
}
