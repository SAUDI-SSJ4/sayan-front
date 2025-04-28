import { getData, sendData } from "./production";

export function useSlider(academyId) {
  let { data, isLoading, errors } = getData(`/slider/${academyId}`);
  return { data, isLoading, errors };
}

export function useUpdateSlider() {
  let { data, isLoading, errors, postData } = sendData("/slider");
  return { data, isLoading, errors, postData };
}
