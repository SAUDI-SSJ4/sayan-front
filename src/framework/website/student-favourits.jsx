import { deleteData, getData, putData, sendData } from "./production";



  export function useToggle(formData) {
    let data=sendData('/toggle',formData)
      return {data,isLoading,errors};
    }
    
  export function useAllFavourits() {
    let data=getData('/favourites')
      return {data,isLoading,errors};
    }

