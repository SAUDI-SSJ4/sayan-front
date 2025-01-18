import { deleteData, getData, putData, sendData } from "./production";

// export function useAllCourses() {
//   let{data,isLoading,errors}=getData('/course')
//     return {data,isLoading,errors};
//   }

  export function useCreateCourseCategorie(formData) {
    let data=sendData('/coursecategory',formData)
      return {data,isLoading,errors};
    }



export function useSpasificCourceCategorie(id) {
  let{data,isLoading,errors}=getData(`/coursecategories/${id}`)
    return {data,isLoading,errors};
  }



export function useUpdateCourseCAtegorie(id,formData) {
    let data=putData(`/coursecategory/${id}`,formData)
      return {data,isLoading,errors};
    }

export function useDeleteCategorie(id) {
    let data=deleteData(`/coursecategory/${id}`)
      return {data,isLoading,errors};
    }
