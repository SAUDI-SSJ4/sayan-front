import { deleteData, getData, putData, sendData } from "./production";

export function useCourses() {
  let { data, isLoading, errors } = getData("/courses");
  return { data, isLoading, errors };
}

export function useSpasificCourse(id) {
  let { data, isLoading, errors } = getData(`/course/${id}`);
  return { data, isLoading, errors };
}
