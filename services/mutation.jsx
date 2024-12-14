import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { postToggle } from "../src/utils/apis/client";
import { createCourse , createLesson } from "../src/utils/apis/client/academy";
import { useCallback } from 'react';

export function handleValidationErrors(errors) {
  const errorMessages = [];
  for (const [field, messages] of Object.entries(errors)) {
    messages.forEach((message) => {
      errorMessages.push(`${field}: ${message}`);
    });
  }
  return errorMessages;
}

export const useToggleMutation = () => {
  const successMessage = "تم إضافة الدورة التعليمية إلى المفضلة";
  const errorMessage = "حدث خطأ أثناء إضافة الدورة إلى المفضلة";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postToggle(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
      queryClient.invalidateQueries({ queryKey: ["studentFavourites"] });
      Swal.fire({
        title: "🎉 تمت الإضافة",
        text: successMessage,
        icon: "success",
      });
    },
    onError: ({ response }) => {
      const serverMessage = response?.data?.message ?? errorMessage;
      Swal.fire({
        title: "خطأ",
        text: serverMessage,
        icon: "error",
      });
    },
  });
};

export const useCreateCourseMutation = () => {
  const successMessage = "تم إضافة الدورة التعليمية";
  const errorMessage = "حدث خطأ أثناء إضافة الدورة ";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createCourse(data),
    onSuccess: ({data}) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
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

export const useCreateLessonMutation = () => {
  const successMessage = "تم إضافة الدرس التعليمية";
  const errorMessage = "حدث خطأ أثناء إضافة الدرس ";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createLesson(data),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
      Swal.fire({
        title: "🎉 تمت الإضافة",
        text: successMessage,
        icon: "success",
      });
    },
    onError: ({ response }) => {
      const err = handleValidationErrors(response.data.errors);
      const errorList = `<ul style="text-align: left;">${err.map(
        (error) => `<li style="color: red;">${error}</li>`
      ).join("")}</ul>`;
      Swal.fire({
        title: "خطأ",
        html: errorList || errorMessage,
        icon: "error",
      });
    },
  });
};


export const useCreateExamMutation = () => {
  const successMessage = "تم إضافة الاختبار التعليمية";
  const errorMessage = "حدث خطأ أثناء إضافة الاختبار ";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createLesson(data),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
      Swal.fire({
        title: "🎉 تمت الإضافة",
        text: successMessage,
        icon: "success",
      });
    },
    onError: ({ response }) => {
      const err = handleValidationErrors(response.data.errors);
      const errorList = `<ul style="text-align: left;">${err.map(
        (error) => `<li style="color: red;">${error}</li>`
      ).join("")}</ul>`;
      Swal.fire({
        title: "خطأ",
        html: errorList || errorMessage,
        icon: "error",
      });
    },
  });
};




