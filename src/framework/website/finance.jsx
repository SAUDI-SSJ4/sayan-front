import { deleteData, getData, putData, sendData } from "./production";

export function useFinance() {
  let { data, isLoading, errors } = getData("/packages");
  return { data, isLoading, errors };
}
