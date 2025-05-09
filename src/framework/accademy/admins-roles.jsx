//slider.jsx
import { deleteData, getData, putData, sendData } from "./production";

export function useAllRoles() {
  let{data,isLoading,errors}=getData('/role')
    return {data,isLoading,errors};
  }

  export function useCreateRole(formData) {
      let data=sendData('/role',formData)
        return {data,isLoading,errors};
      }

  export function useUpdateRole(id,formData) {
    let data=putData(`/role/${id}`,formData)
      return {data,isLoading,errors};
    }

  export function useDeleteRole(id) {
    let data=deleteData(`/role/${id}`)
      return {data,isLoading,errors};
    }










