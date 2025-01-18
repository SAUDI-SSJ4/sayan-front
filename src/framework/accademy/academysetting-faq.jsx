//slider.jsx
import { deleteData, getData, sendData } from "./production";
export function useAllFAQ() {
  let{data,isLoading,errors,refresh}=getData(`/faq`)

    return {data,isLoading,errors,refresh};
  }
export function useSpasificFAQ(id) {
  let{data,isLoading,errors}=getData(`/faq/${id}`)
    return {data,isLoading,errors};
  }

export function useCreateFAQ(formData) {
    let {data,isLoading,errors,postData}=sendData('/faq',formData)
      return {data,isLoading,errors,postData};
    }

    export function useUpdateFAQ(id) {
      let {data,isLoading,errors,postData}=sendData(`/faq/${id}`)
        return {data,isLoading,errors,postData};
      }

export function useDeleteFAQ(id) {
    let data=deleteData(`/faq/${id}`)
      return {data,isLoading,errors};
    }
