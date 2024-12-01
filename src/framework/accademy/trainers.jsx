import { deleteData, getData, putData, sendData } from "./production";

export function useAllTrainer() {
  let { data, isLoading, errors } = getData("/trainer");
  return { data, isLoading, errors };
}
export function useSpasificTrainer(id) {
  let { data, isLoading, errors } = getData(`/trainer/${id}`);
  return { data, isLoading, errors };
}

export function useCreateTrainer(formData) {
  let { data, isLoading, errors } = sendData("/trainer", formData);
  return { data, isLoading, errors };
}

export function useUpdateTrainer(id, formData) {
  let { data, isLoading, errors } = putData(`/trainer/${id}`, formData);
  return { data, isLoading, errors };
}

export function useDeleteTrainer(id) {
  let { data, isLoading, errors } = deleteData(`/trainer/${id}`);
  return { data, isLoading, errors };
}
