import { deleteData, getData, putData, sendData } from "./production";



  export function useUpdateProfile(formData) {
    let data=sendData('/profile',formData)
      return {data,isLoading,errors};
    }
    
  export function useUpdatePassword(formData) {
    let data=sendData('/password',formData)
      return {data,isLoading,errors};
    }

  export function useForgetPassword(formData) {
    let data=sendData('/forgetpassword',formData)
      return {data,isLoading,errors};
    }

  export function useUpdateToken(formData) {
    let data=sendData('/forgetpassword',formData)
      return {data,isLoading,errors};
    }

  export function useProfile() {
    let data=getData('/profile')
      return {data,isLoading,errors};
    }
