import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseAPI} from "../../apis/client/academy";
import { useToast } from "../useToast";
import Swal from "sweetalert2";
const { success, error } = useToast()


export const useSetCourseMutation = () => {
    const successMessage = "تم إضافة الدورة التعليمية";
    const errorMessage = "حدث خطأ أثناء إضافة الدورة ";
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data) => createCourseAPI(data),
      onSuccess: ({data}) => {
        console.log(data);
        queryClient.refetchQueries({ queryKey: ["studentCourses"] });
        success('تم إضافة الدورة بنجاح')
      },
      onError: ({ response }) => {
        if (response.data?.errors) {
          const err = handleValidationErrors(response.data.errors);
          const errorList = `<ul style="text-align: left;">${err
            .map((error) => `<li style="color: red;">${error}</li>`)
            .join("")}</ul>`;
  
          Swal.fire({
            title: "خطأ في البيانات",
            html: errorList,
            icon: "error",
          });
        } else if (response.data?.success === false) {
          Swal.fire({
            title: "فشل العملية",
            text: response.data.message || errorMessage,
            icon: "error",
          });
        } 
        else {
          Swal.fire({
            title: "خطأ",
            text: errorMessage,
            icon: "error",
          });
        }
      },
      
    });
  };


  export function handleValidationErrors(errors) {
    const errorMessages = [];
    for (const [field, messages] of Object.entries(errors)) {
      messages.forEach((message) => {
        errorMessages.push(`${field}: ${message}`);
      });
    }
    return errorMessages;
  }