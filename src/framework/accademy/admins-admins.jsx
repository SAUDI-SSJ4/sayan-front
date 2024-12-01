//slider.jsx
import { deleteData, getData, putData, sendData } from "./production";

export function useAllAdmins() {
  let{data,isLoading,errors}=getData('/admin')
    return {data,isLoading,errors};
  }

  export function useCreateAdmin(formData) {
      let data=sendData('/admin',formData)
        return {data,isLoading,errors};
      }

  export function useUpdateAdmin(id,formData) {
    let data=putData(`/admin/${id}`,formData)
      return {data,isLoading,errors};
    }

  export function useDeleteAdmin(id) {
    let data=deleteData(`/admin/${id}`)
      return {data,isLoading,errors};
    }










