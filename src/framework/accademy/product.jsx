import { deleteData, getData, putData, sendData } from "./production";

//product
export function useAllProduct() {
  let{data,isLoading,errors}=getData('/product')
    return {data,isLoading,errors};
  }

  export function useUpdateProduct(id,formData) {
    let {data,isLoading,errors,postData}=putData(`/product/${id}`,formData)
      return {data,isLoading,errors,postData};
    }


  export function useCreateProduct() {
    let {data,isLoading,errors,postData}=sendData('/product')
      return {data,isLoading,errors,postData};
    }



  export function useSpasificProduct(id) {
    let{data,isLoading,errors}=getData(`/product/${id}`)
      return {data,isLoading,errors};
    }


export function useDeleteProduct(id) {
    let{data,deleteDataa}=deleteData(`/product/${id}`)
    return {data,deleteDataa}
    }


