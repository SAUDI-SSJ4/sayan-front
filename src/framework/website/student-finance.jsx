import { deleteData, getData, putData, sendData } from "./production";

    
  export function usePayments() {
    let data=getData('/payments')
      return {data,isLoading,errors};
    }

