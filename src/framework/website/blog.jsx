import { deleteData, getData, putData, sendData } from "./production";

export function useAllBlog() {
  let { data, isLoading, errors } = getData("/blogs");
  return { data, isLoading, errors };
}

export function useSpasificBlog(id) {
  let { data, isLoading, errors } = getData(`/blog/${id}`);
  return { data, isLoading, errors };
}
