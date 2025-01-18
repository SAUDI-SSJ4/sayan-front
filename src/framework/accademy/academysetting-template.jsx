//slider.jsx
import { deleteData, getData, sendData } from "./production";

export function useTemplate() {
  let { data, isLoading, errors } = getData("/template");
  return { data, isLoading, errors };
}

export function useCreatTemplate(formData) {
  let data = sendData(`/template`, formData);
  return { data };
}
