import { deleteData, getData, putData, sendData } from "./production";

export function useAllCategorieBlog() {
  let{data,isLoading,errors}=getData('/blogcategory')
    return {data,isLoading,errors};
  }
export function useAllBlog() {
  let{data,isLoading,errors}=getData('/blog')
    return {data,isLoading,errors};
  }

  export function useUpdateBlog(id,formData) {
    let data=putData(`/blog/${id}`,formData)
      return {data,isLoading,errors};
    }


  export function useCreateBlog(formData) {
    let data=sendData('/blog',formData)
      return {data,isLoading,errors};
    }



  export function useSpasificBlog(id) {
    let{data,isLoading,errors}=getData(`/blog/${id}`)
      return {data,isLoading,errors};
    }


export function useDeleteBlog(id) {
    let data=deleteData(`/blog/${id}`)
      return {data,isLoading,errors};
    }
