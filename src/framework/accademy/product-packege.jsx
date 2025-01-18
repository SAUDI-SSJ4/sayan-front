import { deleteData, getData, putData, sendData } from "./production";

//productPackage
export function useAllProductPackage() {
  let{data,isLoading,errors}=getData('/productpackage')
    return {data,isLoading,errors};
  }

  export function useUpdateProductPackage(id,formData) {
    let data=putData(`/productpackage/${id}`,formData)
      return {data,isLoading,errors};
    }


  export function useCreateProductPackage(formData) {
    let data=sendData('/productpackage',formData)
      return {data,isLoading,errors};
    }



  export function useSpasificProductPackage(id) {
    let{data,isLoading,errors}=getData(`/productpackage/${id}`)
      return {data,isLoading,errors};
    }


export function useDeleteProductPackage(id) {
    let data=deleteData(`/productpackage/${id}`)
      return {data,isLoading,errors};
    }


