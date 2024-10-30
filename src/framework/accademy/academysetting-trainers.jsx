//slider.jsx
import { deleteData, getData, sendData } from "./production";
export function useTrainer() {
  let { data, isLoading, errors } = getData("/trainer");
  return { data, isLoading, errors };
}

export function useUpdateTrainer(formData) {
  let { data, isLoading, errors } = sendData(`/trainer`, formData);
  return { data, isLoading, errors };
}

export function useCreateTrainer(formData) {
  let { data, isLoading, errors, postData } = sendData("/trainer", formData);
  return { data, isLoading, errors, postData };
}
