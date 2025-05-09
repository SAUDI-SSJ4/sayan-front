//slider.jsx
import { deleteData, getData, putData, sendData } from "./production";

export function useAllPermition() {
  let{data,isLoading,errors}=getData('/permissions')
    return {data,isLoading,errors};
  }












