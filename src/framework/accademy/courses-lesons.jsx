import { deleteData, getData, putData, sendData } from "./production";

// export function useAllCourses() {
//   let{data,isLoading,errors}=getData('/course')
//     return {data,isLoading,errors};
//   }

  export function useCreateLeson(formData) {
    let data=sendData('/lesson',formData)
      return {data,isLoading,errors};
    }



export function useSpasificLeson(id) {
  let{data,isLoading,errors}=getData(`/lesson/${id}`)
    return {data,isLoading,errors};
  }



export function useUpdateLesson(id,formData) {
    let data=putData(`/lesson/${id}`,formData)
      return {data,isLoading,errors};
    }

// export function useDeleteCategorie(id) {
//     let data=deleteData(`/coursecategory/${id}`)
//       return {data,isLoading,errors};
//     }
