import { deleteData, getData, putData, sendData } from "./production";

    
  export function useAcademyProducts(id) {
    let data=getData(`/academy/${id}/products`)
      return {data,isLoading,errors};
    }
  export function useSpacificAcademyProduct(idAccademy,idProduct) {
    let data=getData(`/academy/${idAccademy}/product/${idProduct}`)
      return {data,isLoading,errors};
    }

