//slider.jsx
import { deleteData, getData, sendData } from "./production";


export function useAllActions() {
  let{data,isLoading,errors}=getData('/calltoaction')
    return {data,isLoading,errors};
  }

export function useSpasificActions(id) {
  let{data,isLoading,errors}=getData(`/calltoaction/${id}`)
    return {data,isLoading,errors};
  }
  

export function useCreateAction(formData) {
    let {data,isLoading,errors,postData}= sendData('/calltoaction',formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      return {data,isLoading,errors,postData};
    }

export function useUpdateAction(id) {
      let {data,isLoading,errors,postData}=sendData(`/calltoaction/${id}`, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return {data,isLoading,errors,postData};
    }

export function useDeleteAction(id) {
    let data=deleteData(`/calltoaction/${id}`)
      return {data};
    }
