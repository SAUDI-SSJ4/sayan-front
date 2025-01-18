import { deleteData, getData, putData, sendData } from "./production";



  export function useBuyBroduct(formData) {
    let data=sendData('/buyproduct',formData)
      return {data,isLoading,errors};
    }
    
  export function useMyProducts() {
    let data=getData('/myproducts')
      return {data,isLoading,errors};
    }

