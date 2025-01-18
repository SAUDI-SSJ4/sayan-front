import { deleteData, getData, putData, sendData } from "./production";

export function useAcademyHome(id) {
  console.log("----------------------------*********-------------------------");

  console.log(id);
  console.log("-----------------------------*********------------------------");

  let { data, isLoading, errors } = getData(`/academy/${id}`);
  return { data, isLoading, errors };
}
