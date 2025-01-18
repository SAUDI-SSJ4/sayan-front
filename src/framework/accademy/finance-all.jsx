import { deleteData, getData, putData, sendData } from "./production";

export function useAllFinancePackage() {
  let{data,isLoading,errors}=getData('/package')
    return {data,isLoading,errors};
  }
export function useAllSubscriptionPackage() {
  let{data,isLoading,errors}=getData('/subscriptions')
    return {data,isLoading,errors};
  }

  export function useCreateSubscriptionPackage(formData) {
    let data=sendData('/subscripe',formData)
      return {data,isLoading,errors};
    }







