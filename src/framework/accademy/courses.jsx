import { deleteData, getData, putData, sendData } from "./production";

export function useAllCourses() {
  let{data,isLoading,errors}=getData('/course')
    return {data,isLoading,errors};
  }

  export function useCreateCourse(formData) {
    let data=sendData('/course',formData)
      return {data,isLoading,errors};
    }



export function useSpasificCource(id) {
  let{data,isLoading,errors}=getData(`/course/${id}`)
    return {data,isLoading,errors};
  }



// export function useUpdateTrainer(id,formData) {
//     let data=putData(`/trainer/${id}`,formData)
//       return {data,isLoading,errors};
//     }

// export function useDeleteTrainer(id) {
//     let data=deleteData(`/trainer/${id}`)
//       return {data,isLoading,errors};
//     }
