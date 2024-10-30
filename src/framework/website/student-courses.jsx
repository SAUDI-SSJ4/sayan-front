import { deleteData, getData, putData, sendData } from "./production";



  export function useBuyCourse(formData) {
    let data=sendData('/buy',formData)
      return {data,isLoading,errors};
    }
    
  export function useAllCourses() {
    let data=getData('/mycourses')
      return {data,isLoading,errors};
    }
  export function useSpacifcCourses(id) {
    let data=getData(`/mycourses/${id}`)
      return {data,isLoading,errors};
    }
