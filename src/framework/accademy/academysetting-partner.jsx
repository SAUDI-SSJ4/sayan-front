//slider.jsx
import { deleteData, getData, sendData } from "./production";

export function usePartner() {
  let{data,isLoading,errors}=getData('/partner')
    return {data,isLoading,errors};
  }

export function useCreatPartner(formData) {
    let {data,isLoading,errors,postData}=sendData(`/partner`,formData)
      return {data,isLoading,errors,postData};
    }


export function useDeletePartner(id) {
      let data=deleteData(`/partner/${id}`)
        return {data,isLoading,errors};
      }

