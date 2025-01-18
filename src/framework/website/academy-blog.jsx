import { deleteData, getData, putData, sendData } from "./production";

    
  export function useAcademyBlog(id) {
    let data=getData(`/academy/${id}/blogs`)
      return {data,isLoading,errors};
    }
  export function useSpacificAcademyBlog(idAccademy,idBlog) {
    let data=getData(`/academy/${idAccademy}/blog/${idBlog}`)
      return {data,isLoading,errors};
    }

