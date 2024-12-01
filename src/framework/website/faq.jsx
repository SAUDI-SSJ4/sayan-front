import { deleteData, getData, putData, sendData } from "./production";

export function useFAQ() {
  let { data, isLoading, errors } = getData("/faq");
  return { data, isLoading, errors };
}
