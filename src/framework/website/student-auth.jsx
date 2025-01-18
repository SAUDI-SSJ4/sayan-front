import { deleteData, getData, putData, sendData } from "./production";



  export function useLogin(formData) {
    let data=sendData('/login',formData)
      return {data,isLoading,errors};
    }
    
  export function useRegister(formData) {
    let data=sendData('/register',formData)
      return {data,isLoading,errors};
    }
