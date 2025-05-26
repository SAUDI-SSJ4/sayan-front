import { useFormik } from "formik";
import React from "react";
import { fetchCategoriesThunk } from "../../../../../redux/CategorySlice";
import { fetchTrainerThunk } from "../../../../../redux/TrainerSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Alert, Button, Spinner } from "react-bootstrap";
import { getCourseSchema } from "../../../../validations/academy/course";
import { useMutation } from "@tanstack/react-query";
import {
  createCourseAPI,
  updateCourseAPI,
} from "../../../../utils/apis/client/academy";
import { useNavigate } from "react-router-dom";
import AddBasicInfo from "../../course/components/AddBasicInfo";
import Loader from "../../../../components/Loader";

function getInitialValues(course) {
  return {
    image: null,
    short_video: null,
    title: course?.title || "",
    type: course?.type || "",
    trainer_id: course?.trainer_id || "",
    category_id: course?.category_id || "",
    price: course?.price || "",
    level: course?.level || "",
    content: course?.content || "",
    short_content: course?.short_content || "",
    learn: course?.learn || "",
    requirments: course?.requirments || "",
  };
}

function CourseForm({ course }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    trainers,
    isLoading: trainersIsLoading,
    error: trainersError,
  } = useSelector((state) => state.trainers);

  const {
    categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const addCourseMutation = useMutation({
    mutationFn: async (formData) => await createCourseAPI(formData),
  });
  const updateCourseMutation = useMutation({
    mutationFn: async (formData) => await updateCourseAPI(course.id, formData),
  });

  const formik = useFormik({
    initialValues: getInitialValues(course),
    validationSchema: getCourseSchema(course),
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if ((key === "image" && !value) || (key === "short_video" && !value))
          return;
        formData.append(key, value);
      });

      if (course) {
        formData.append("_method", "PUT");
        try {
          const res = await updateCourseMutation.mutateAsync(formData);
          if (res.status) {
            toast.success(res.message);
          }
        } catch (error) {
          console.error("Error updating course:", error);
        }
      } else {
        try {
          const res = await addCourseMutation.mutateAsync(formData);
          if (res.status) {
            toast.success(res.message);
            navigate(`/academy/course/${res.data.id}/manage`);
            formik.resetForm();
          }
        } catch (error) {
          console.error("Error creating course:", error);
        }
      }
    },
  });

  // useEffect(() => {
  //   const loadInitialData = async () => {
  //     try {
  //       await Promise.all([
  //         dispatch(fetchCategoriesThunk()).unwrap(),
  //         dispatch(fetchTrainerThunk()).unwrap(),
  //       ]);
  //     } catch (error) {
  //       toast.error("حدث خطأ أثناء تحميل البيانات الأساسية");
  //       console.error("Error loading initial data:", error);
  //     }
  //   };
  //   loadInitialData();
  // }, [dispatch]);

  const isLoading = trainersIsLoading || categoriesIsLoading;
  const isError = trainersError || categoriesError;
  const isPending =
    addCourseMutation.isPending || updateCourseMutation.isPending;
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center py-40">
          <Spinner />
        </div>
      )}
      {!isLoading && isError && (
        <Alert variant="danger" className="mb-4 rounded-[8px]">
          <div className="mb-2 fw-bold" style={{ fontSize: "16px" }}>
            حدث خطأ أثناء تحميل البيانات
          </div>
          <p style={{ fontSize: "14px", margin: 0 }}>
            {trainersError && "تعذر تحميل قائمة المدربين. "}
            {categoriesError && "تعذر تحميل قائمة الفئات. "}
            يرجى المحاولة مرة أخرى لاحقاً.
          </p>
        </Alert>
      )}
      {!isLoading && categories && trainers && (
        <form onSubmit={formik.handleSubmit}>
          <AddBasicInfo formik={formik} course={course} />
          <Button
            type="submit"
            className="my-2 mx-auto !flex gap-2 justify-center items-center w-40 h-10"
            disabled={isPending}
          >
            {isPending ? (
              <Loader className="!w-5 !h-5" />
            ) : course ? (
              "تحديث الدورة"
            ) : (
              "إضافة دورة"
            )}
          </Button>
        </form>
      )}
    </>
  );
}

export default CourseForm; 