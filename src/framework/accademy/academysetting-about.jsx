//slider.jsx
import { getData, sendData } from "./production";
export function useAbout() {
  let{data,isLoading,errors}=getData('/about')
    return {data,isLoading,errors};
  }

  export function useUpdateAbout() {
    let {data,isLoading,errors,postData}=sendData('/about')
      return {data,isLoading,errors,postData};
    }
