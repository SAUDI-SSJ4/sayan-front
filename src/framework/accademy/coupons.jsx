import { deleteData, getData, putData, sendData } from "./production";

export function useAllCoupon() {
  let{data,isLoading,errors}=getData('/coupon')
    return {data,isLoading,errors};
  }


  export function useCreateCoupon(formData) {
    let data=sendData('/coupon',formData)
      return {data,isLoading,errors};
    }







